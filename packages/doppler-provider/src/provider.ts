import {MessageName, Project, Report}               from '@yarnpkg/core';
import {PortablePath}                               from '@yarnpkg/fslib';
import {InvalidJsonError, asyncExec, safeJsonParse} from 'utils';

import {CLI_BIN, checkIfInstalled}                  from './check-if-installed';
import {checkIfProjectExist}                        from './check-if-project-exists';
import {getConfig}                                  from './get-config';


const PROVIDER_KEY = `doppler` as const;
const TIMEOUT_DURATION = 10; // seconds

export const  get = async ({project, report}: {project: Project, report: Report}): Promise<Record<string, string>>  => {
  const progress = Report.progressViaCounter(4);
  const loader = report.reportProgress(progress);

  try {
    // Step 1: Check pre-requisites
    await checkIfInstalled(report);
    progress.set(1);

    // Step 2: Get config
    const workspace = (project.getWorkspaceByCwd(process.cwd() as PortablePath));
    const {setup: {project: name, config}, isInferred} = await getConfig(workspace, report);
    if (isInferred) {
      const exists = await checkIfProjectExist(name);

      if (!exists) {
        report.reportInfoOnce(MessageName.UNNAMED, `Project ${name} does not exist`);
        return null;
      }
    }
    progress.set(2);
    report.reportInfoOnce(MessageName.UNNAMED, `Project name: ${name}`);

    // Step 3: Get secrets
    const secrets =  await asyncExec(`${CLI_BIN} secrets download`, [`--no-file`, `--format=json`, `-p ${name}`, config ? `-c ${config}` : ``, `--timeout ${TIMEOUT_DURATION}s`], false);
    progress.set(3);
    report.reportInfoOnce(MessageName.UNNAMED, `Fetched successfully`, {reportExtra: () => secrets});

    // Step 4: Parse secrets
    const secretsJson = safeJsonParse(secrets);
    progress.set(4);
    return secretsJson;
  } catch (e) {
    if (e instanceof InvalidJsonError) {
      report.reportWarningOnce(MessageName.UNNAMED, `Invalid json returned from doppler`);
      return null;
    }

    report.reportWarningOnce(MessageName.UNNAMED, e.message);
    return null;
  } finally {
    loader.stop();
  }
};

export const DopplerProvider = {
  get,
  key: PROVIDER_KEY,
};
