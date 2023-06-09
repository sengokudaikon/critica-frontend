import { Key } from "react";

export type TestItemType = Key;
export type TestListType = Key[];
export type TestItemResolveType = { testItem: TestItemType };
export type TestListResolveType = { testList: TestListType };
export type TestStatusResolveType = { status: string};

const testList: TestListType = [
  '1',
  '2',
  '3'
];

export async function loadTestList() {
  console.log('loadTestList:start');
  return new Promise<TestListResolveType>((resolve) => {
    setTimeout(() => {
      console.log('loadTestList:finish');
      resolve({ testList: testList });
    }, 1000);
  });
}

export async function createTestItem() {
  console.log('createTestItem:start');
  return new Promise<TestItemResolveType>((resolve) => {
    setTimeout(() => {
      const testItem = String(+testList[testList.length - 1] + 1);
      testList.push(testItem);
      console.log('createTestItem:finish');
      resolve({ testItem: testItem });
    }, 1000);
  });
}

export async function loadTestItem({ params }: { params: { id?: Key } }) {
  console.log('loadTestItem:start');
  return new Promise<TestItemResolveType>((resolve) => {
    setTimeout(() => {
      const testItem = testList[Number(params.id) - 1];
      console.log('loadTestItem:finish');
      resolve({ testItem: testItem })
    }, 1000);
  });
}

export async function deleteTestItem({ params }: {params: {id?: Key}}) {
  console.log('deleteTestItem');
  return new Promise<TestStatusResolveType>(resolve => {
    setTimeout(() => {
      const ind = testList.findIndex((item) => item === String(params.id))
      if (ind >= 0) {
        testList.splice(ind, 1);
      }
      console.log('deleteTestItem:finish');
      resolve({status: 'ok'})
    })
  })
}