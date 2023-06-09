import { Form, redirect, useLoaderData } from 'react-router-dom';
import { TestItemResolveType, deleteTestItem } from '../../model/test';

function TestItem() {
  const { testItem } = useLoaderData() as TestItemResolveType;

  return (
    <div>
      <div>TestItemKey: {testItem}</div>
      <Form method="post">
        <button type="submit">delete</button>
      </Form>
    </div>
  )
}

export default TestItem

export async function destroyTestItem({ request, params }: { request: Request, params: {}}) {
  const status = await deleteTestItem({params});
  console.log(status);
  return redirect(`/test`)
}