// // src/agent.js
// import { Actor, HttpAgent } from '@dfinity/agent';
// import { idlFactory as health_connect_backend_idl, canisterId as health_connect_backend_id } from 'dfx-generated/helctest_backend';
// import { idlFactory as helctest_frontend_idl, canisterId as helctest_frontend_id } from 'dfx-generated/helctest_frontend';

// export const createActor = (idlFactory, canisterId) => {
//     const agent = new HttpAgent();
//     if (process.env.NODE_ENV !== 'production') {
//         agent.fetchRootKey();
//     }
//     return Actor.createActor(idlFactory, { agent, canisterId });
// };

// export const healthConnectBackend = createActor(health_connect_backend_idl, health_connect_backend_id);
// export const helctestFrontend = createActor(helctest_frontend_idl, helctest_frontend_id);

// const actor = Actor.createActor()

import { Actor, HttpAgent } from '@dfinity/agent';

import { idlFactory } from '../../declarations/helctest_backend';

const NETWORK = 'https://ic0.app'
const CANISTER_ID = process.env.CANISTER_ID

const agent = new HttpAgent({ host: NETWORK })


const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId: CANISTER_ID
})
export { actor }