import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

const CourseIdPage = () => {
  return <div></div>;
};

type StaticProps = {};

type Params = {};
export const getStaticProps: GetStaticProps<StaticProps, Params> = async () => {
  return {
    props: {},
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default CourseIdPage;
