// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MaxHeapOrderBook {
     struct Orderbook {
        uint256 price;
        uint256 amount;
    }


    Orderbook[] public heap;

    function fillOrder(uint _price,uint _amount) external{
         Orderbook memory newOrder = Orderbook(_price,_amount);
        heap.push(newOrder);
     
    }

    function sortPrice() public{
        MaxHeap();
        uint heapSize = heap.length;
        for(uint i = heapSize-1;i>0;i--){
             (heap[0].price, heap[i].price) = (heap[i].price, heap[0].price);
            heapSize--;
            maxHeapify(0, heapSize);
        }
    }

    function findMin() public view returns(uint){
        // sortPrice();
         return heap[0].price;
    }

    function findMax() public view returns(uint){
        // sortPrice();
        return heap[heap.length-1].price;
    }
    function popMax() external{
        // sortPrice();
        heap.pop();
    }

    function MaxHeap() public{
        for(uint i = (heap.length/2)-1; i>0;i--){
           maxHeapify(i, heap.length);
        }
        maxHeapify(0,heap.length);
    }

    
function maxHeapify(uint i, uint heapSize) internal {
        uint largest = i; 
        uint left = 2 * i + 1; 
        uint right = 2 * i + 2; 
        if (left < heapSize && heap[left].price > heap[largest].price) {
            largest = left;
        }
        if (right < heapSize && heap[right].price > heap[largest].price) {
            largest = right;
        }
        if (largest != i) {
            (heap[i].price, heap[largest].price) = (heap[largest].price, heap[i].price);
            maxHeapify(largest,heapSize);
        }
    }
}