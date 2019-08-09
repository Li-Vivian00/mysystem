import test from 'ava';
import sinon from 'sinon'
import adminLoginRepository from '../../../repositories/login/adminLogin.rep'
import adminLoginService from '../../../service/login/adminLogin.service'

const sandbox = sinon.createSandbox();
sandbox.stub(adminLoginRepository);

test('should enter adminHome when given account & password ', async t =>{
  adminLoginRepository.adminLogin.withArgs('selectName','params','coo').returns('success Login');

  let data = await adminLoginService.adminLogin('selectName','params','coo');
  t.deepEqual(data, 'success Login');
})