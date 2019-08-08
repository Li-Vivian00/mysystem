import test from 'ava';
// import sinon from 'sinon';
// import axios from 'axios';
// import vue from 'vue'
// import * as adminLoginService from '../src/service/login/adminLogin.service'

// const sandbox = sinon.createSandbox();
// sandbox.stub(axios)

// test('should post a request when given `name` and `password` then return the login result', async t => {
//   axios.post.withArgs('/api/adminLogin/adminlogin', {
//     name: 'admin1',
//     password: 'admin1'
//   }).returns('success')
//   const result = await adminLoginService({
//     username: 'admin1',
//     password: 'admin1'
//   }, vue)
//   t.is(result, 'succcess')
// })
test('foo', t => {
  t.pass();
});

test('bar', async t => {
  const bar = Promise.resolve('bar');
  t.is(await bar, 'bar');
});