import {Hooks, MessageName, Plugin, Project, StreamReport} from '@yarnpkg/core';
import {writeEnv}                                          from 'utils';

import {factory}                                           from './providers';

const plugin: Plugin<Hooks> = {
  hooks: {
    setupScriptEnvironment: async (project: Project, env: Record<string, string>) => {
      const providerKey = process.env.SECRETS_PROVIDER ?? `infisical`;

      const report = await StreamReport.start(
        {
          configuration: project.configuration,
          stdout: process.stdout,
          includeLogs: true,
        },
        async (report: StreamReport) => {
          await report.startTimerPromise(`Fetching secrets from ${providerKey}`, async () => {
            try {
              const provider = await factory(providerKey);
              const secrets = await provider.get({project, report});
              if (secrets) {
                writeEnv(env, secrets, report);
              }
            } catch (e: unknown) {
              if (!(e instanceof Error)) return;
              report.reportErrorOnce(MessageName.UNNAMED, e.message);
            }
          });
        },
      );
      report.exitCode();
    },
  },
};

// eslint-disable-next-line arca/no-default-export
export default plugin;
