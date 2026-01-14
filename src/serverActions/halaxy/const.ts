export type OrgKeys = keyof typeof orgIds;
export type OrgIds = {
    online: string;
    bacchus_marsh: string;
    geelong: string;
}

export const halaxyAccounts = [
    {
        account_name: "Realworld Psychology",
        client_id: "7c06ce128f43f8f18395664f8ef62636",
        client_secret: "4fe1540ac6ad2132d28aa9ff38854d9e0e95462eaecea7905146b41939f2180ceed6a0de84995c4b442fae5d67e3e8fe3ef3c6e89240a6063a707f8555c588a5",
        orgIds: {
            online: 'CL-1335519',
            bacchus_marsh: 'CL-615081',
            geelong: 'CL-1334751',
        }
    },
    {
        account_name: "Ballarat Psychology Clinic",
        client_id: "5e048d8260281c14a17bc4801a4ab424",
        client_secret: "e750aed87f9d6e4819b01524bb82ae67a2f72b287b09665463fe6d9dc26ffc3852fc56c97ba98f6156973c7f1a2d809983c24c9e32e5bfa432554e79ca6c2546",
        orgIds: {
            // online: "CL-1339731",
            ballarat: "CL-732291",
            
        }
    },
    {
        account_name: "Melton Psychology Clinic",
        client_id: "874090902549dc3373ed80f6a8c2e253",
        client_secret: "2f841c8780eccd592a33b7ffb12309d16470c970486f1f63d6c6fbdee844fa443e7eaa730a187acad797d3849ae969d81f42d264eb77c4c96f767d2cd6ff5447",
        orgIds: {
            // online: "CL-1340369",
            melton: "CL-1279641"
        }
    },
];


export const orgIds:OrgIds = halaxyAccounts.filter(account =>
    account.orgIds && Object.keys(account.orgIds).length > 0
).reduce((acc, account) => ({ ...acc, ...account.orgIds }), {} as OrgIds)