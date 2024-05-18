import { client } from "@devrev/typescript-sdk";

async function handleEvent(
  event: any,
) {
  const devrevPAT = event.context.secrets.service_account_token;
  const API_BASE = event.execution_metadata.devrev_endpoint;
  const devrevSDK = client.setup({
    endpoint: API_BASE,
    token: devrevPAT,
  })
  const workCreated = event.payload.source_id;
  const items=(await devrevSDK.worksGet(workCreated)).data;
  
  const body = {
    type:items.work.type,
    title:"[clone]"+items.work.title,
    applies_to_part:items.work.applies_to_part,
    owned_by:[
       items.work.owned_by
    ],
    tags:items.work.tags,
    
  }
  
  const response = await devrevSDK.worksCreate(body as any);
  return response;

}

export const run = async (events:any[]) => {
  console.info('events', JSON.stringify(events), '\n\n\n');
  for (let event of events) {
    const resp = await handleEvent(event);
    console.log(JSON.stringify(resp.data));
  }
};

export default run;