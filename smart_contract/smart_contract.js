const { Client, AccountBalanceQuery, Hbar, AccountCreateTransaction, TransferTransaction } = require("@hashgraph/sdk");

class HederaSmartContract {
    constructor() {
        this.client = Client.forTestnet(); // Replace with appropriate network client setup
        this.operatorKey = process.env.OPERATOR_KEY; // Replace with your operator key
        this.operatorId = process.env.OPERATOR_ID; // Replace with your operator ID
        this.contractAccount = null;
    }

    async setupContract() {
        try {
            const operatorId = this.operatorId;
            const operatorKey = this.operatorKey;

            this.client.setOperator(operatorId, operatorKey);

            const receipt = await new AccountCreateTransaction()
                .setKey(operatorKey)
                .execute(this.client);

            const newAccountId = receipt.getAccountId();
            console.log(`Contract account created: ${newAccountId}`);

            this.contractAccount = newAccountId;
        } catch (error) {
            console.error("Error setting up contract:", error);
        }
    }

    async getContractBalance() {
        try {
            const balance = await new AccountBalanceQuery()
                .setAccountId(this.contractAccount)
                .execute(this.client);

            return balance.hbars.toTinybars(); // Convert to smallest unit (tinybars)
        } catch (error) {
            console.error("Error getting contract balance:", error);
        }
    }

    async receiveFunds(amount) {
        try {
            const transferTransaction = await new TransferTransaction()
                .addHbarTransfer(this.client.operatorAccountId, new Hbar(amount))
                .addHbarTransfer(this.contractAccount, new Hbar(-amount))
                .execute(this.client);

            console.log(`Received ${amount} Hedera coins. Transaction ID: ${transferTransaction.transactionId}`);
        } catch (error) {
            console.error("Error receiving funds:", error);
        }
    }

    async transferFunds(amount, recipientAccountId) {
        try {
            const transferTransaction = await new TransferTransaction()
                .addHbarTransfer(this.contractAccount, new Hbar(-amount))
                .addHbarTransfer(recipientAccountId, new Hbar(amount))
                .execute(this.client);

            console.log(`Transferred ${amount} Hedera coins to ${recipientAccountId}. Transaction ID: ${transferTransaction.transactionId}`);
        } catch (error) {
            console.error("Error transferring funds:", error);
        }
    }
}

// Example usage
(async () => {
    const contract = new HederaSmartContract();

    // Setup contract account
    await contract.setupContract();

    // Get contract balance
    const contractBalance = await contract.getContractBalance();
    console.log(`Contract balance: ${contractBalance} tinybars`);

    // Simulating receiving funds
    await contract.receiveFunds(100);

    // Simulating transferring funds to a recipient account
    const recipientAccountId = 'RECIPIENT_ACCOUNT_ID'; // Replace with recipient's account ID
    await contract.transferFunds(50, recipientAccountId);
})();
