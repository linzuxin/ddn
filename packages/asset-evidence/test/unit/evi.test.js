const DEBUG = require('debug')('dao');
import node from '../node';

async function createPluginAsset(type, asset, secret) {
    return await node.ddn.assetPlugin.createPluginAsset(type, asset, secret)
}

describe('asset puglin Test', () => {

    const ipid = `ipid${new Date().getTime()}`;

    it("POST peers/transactions, Should be ok", async () => {
        node.ddn.init();

        const assetEvidence = {
            ipid,
            title: "新增资产说明文档",
            hash: "askdfh12483ashkjfdh128347ahsdfjk1",
            author: "wangxm",
            url: "http://www.ebookchain.org",
            type: ".doc",

            //amount: "1000000000",
            receive_address: node.Daccount.address,

            ext: "china",
            ext1: 12345,
            ext2: new Date()
        };
    
        const transaction = await createPluginAsset(10, assetEvidence, node.Gaccount.password);

        await new Promise((resolve, reject) => {
            node.peer.post("/transactions")
                .set("Accept", "application/json")
                .set("version", node.version)
                .set("nethash", node.config.nethash)
                .set("port", node.config.port)
                .send({
                    transaction
                })
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, {body}) => {
                    // console.log(JSON.stringify(res.body));

                    node.expect(body).to.have.property("success").to.be.true;

                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
            });
        });
    });

    // it("POST peers/transactions agin, Should fail", async () => {
    //     const assetEvidence = {
    //         ipid,
    //         title: "新增资产说明文档",
    //         hash: "askdfh12483ashkjfdh128347ahsdfjk1",
    //         author: "wangxm",
    //         url: "http://www.ebookchain.org",
    //         type: ".doc",

    //         //amount: "1000000000",
    //         receive_address: node.Daccount.address,

    //         ext: "china",
    //         ext1: 12345,
    //         ext2: new Date()
    //     };
    
    //     const transaction = await createPluginAsset(10, assetEvidence, node.Gaccount.password);

    //     await new Promise((resolve, reject) => {
    //         node.peer.post("/transactions")
    //             .set("Accept", "application/json")
    //             .set("version", node.version)
    //             .set("nethash", node.config.nethash)
    //             .set("port", node.config.port)
    //             .send({
    //                 transaction
    //             })
    //             .expect("Content-Type", /json/)
    //             .expect(200)
    //             .end((err, {body}) => {
    //                 // console.log(JSON.stringify(res.body));

    //                 node.expect(body).to.have.property("success").to.be.false;

    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve();
    //                 }
    //         });
    //     });
    // });

});