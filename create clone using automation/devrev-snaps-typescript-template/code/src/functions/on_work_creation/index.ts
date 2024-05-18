import { client, publicSDK } from "@devrev/typescript-sdk";

export async function handleEvent(event: any) {
  const devrevPAT = event.context.secrets.service_account_token;
  const APIBase = event.execution_metadata.devrev_endpoint;
  const devrevSDK = client.setup({
    endpoint: APIBase,
    token: devrevPAT,
  })
  const workCreated = event.payload.work_created.work;
  const body = {
    type: workCreated.type,
    applies_to_part: workCreated.applies_to_part.id,
    owned_by:[workCreated.owned_by[0].id],
    title: "[CLONE ]"+workCreated.title
  }
  const response = await devrevSDK.worksCreate(body as any);
  return response;
}

export const run = async (events: any[]) => {
  for (let event of events) {
    await handleEvent(event);
  }
};

export default run;
