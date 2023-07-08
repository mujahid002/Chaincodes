/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class MobilePhoneContract extends Contract {
    async phoneExists(ctx, phoneId) {
        const buffer = await ctx.stub.getState(phoneId);
        return !!buffer && buffer.length > 0;
    }

    async createPhone(ctx, phoneId, brand, model, price) {
        const exists = await this.phoneExists(ctx, phoneId);
        if (exists) {
            throw new Error(`The phone ${phoneId} already exists`);
        }
        const asset = {
            ID: phoneId,
            Brand: brand,
            Model: model,
            OwnedBy: companyName,
            Price: price,
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(phoneId, buffer);
    }

    async readPhone(ctx, phoneId) {
        const exists = await this.phoneExists(ctx, phoneId);
        if (!exists) {
            throw new Error(`The phone ${phoneId} does not exist`);
        }
        const buffer = await ctx.stub.getState(phoneId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updatePhone(ctx, phoneId, brand, model, companyName, price) {
        const exists = await this.phoneExists(ctx, phoneId);
        if (!exists) {
            throw new Error(`The phone ${phoneId} does not exist`);
        }
        const asset = {
            Brand: brand,
            Model: model,
            Storage: storage,
            OwnedBy: companyName,
            Price: price,
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(phoneId, buffer);
    }

    async deletePhone(ctx, phoneId) {
        const exists = await this.phoneExists(ctx, phoneId);
        if (!exists) {
            throw new Error(`The phone ${phoneId} does not exist`);
        }
        await ctx.stub.deleteState(phoneId);
    }

    async sellPhone(ctx, phoneId, ownerName) {
        const exists = await this.phoneExists(ctx, phoneId);
        if (!exists) {
            throw new Error(`The phone ${phoneId} does not exist`);
        }
        const asset = { OwnedBy: ownerName };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(phoneId, buffer);
    }
}

module.exports = MobilePhoneContract;
