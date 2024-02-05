const { expect, use } = require("chai");
const { ethers } = require("hardhat");

describe("marketPlace", function () {
  
  
     let owner;
    beforeEach(async function () {
      [owner] = await ethers.getSigners();
  
      OrderBook = await ethers.getContractFactory("MaxHeapOrderBook");
      orderbook = await OrderBook.deploy();
   

    });

     
    it("Checking the sortPrice", async function () {
     
      await orderbook.fillOrder(10000,10000);
      await orderbook.fillOrder(1000,1000);
      await orderbook.fillOrder(100,100);

      const beforeSorting0 = await orderbook.heap(0);
      expect(beforeSorting0.price).to.be.eq(10000);

      const beforeSorting1 = await orderbook.heap(1);
      expect(beforeSorting1.price).to.be.eq(1000);

      const beforeSorting2 = await orderbook.heap(2);
      expect(beforeSorting2.price).to.be.eq(100);
      

      await orderbook.sortPrice();

      const afterSorting0 = await orderbook.heap(0);
      expect(afterSorting0.price).to.be.eq(100);

      const afterSorting1 = await orderbook.heap(1);
      expect(afterSorting1.price).to.be.eq(1000);

      const afterSorting2 = await orderbook.heap(2);
      expect(afterSorting2.price).to.be.eq(10000);      


    });

    it("Checking the findMinimum", async function () {
     
      await orderbook.fillOrder(10000,10000);
      await orderbook.fillOrder(1000,1000);
      await orderbook.fillOrder(100,100);

         
      await orderbook.sortPrice();

      const minValue = await orderbook.findMin();

      expect(minValue).to.be.eq(100);    


    });

    it("Checking the findMaximum", async function () {
     
      await orderbook.fillOrder(10000,10000);
      await orderbook.fillOrder(1000,1000);
      await orderbook.fillOrder(100,100);

         
      await orderbook.sortPrice();

      const minValue = await orderbook.findMax();
      
      expect(minValue).to.be.eq(10000);    


    });

    it("Checking the popMax", async function () {
     
      await orderbook.fillOrder(10000,10000);
      await orderbook.fillOrder(1000,1000);
      await orderbook.fillOrder(100,100);

         
      await orderbook.sortPrice();

      await orderbook.popMax();

      const minValue = await orderbook.findMax();
      
      expect(minValue).to.be.eq(1000);    


    });

  });
