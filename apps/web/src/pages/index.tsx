import { nextUrqlClient } from 'gql-client';
import { MemeMaker } from 'meme-maker';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';

const Page: NextPage = () => {
  return <MemeMaker />;
};

export default withUrqlClient(nextUrqlClient)(Page);
