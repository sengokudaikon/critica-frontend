import React from 'react'
import { Form, Link, useLoaderData } from 'react-router-dom';
import { TestListResolveType } from '../../model/test';

function TestList() {
  const { testList } = useLoaderData() as TestListResolveType;

  return (
    <div>
      <ul>
        {testList.map((item) => (
          <li key={item}>
            <Link to={`/test/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
      <Form method="post">
        <button type="submit">Add one more</button>
      </Form>
    </div>
  )
}

export default TestList