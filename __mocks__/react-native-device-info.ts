export default {
  getVersion: jest.fn(() => '0.3.3'),
  getBuildNumber: jest.fn(() => '1'),
  getDeviceId: jest.fn(() => 'emulator'),
  getSystemName: jest.fn(() => 'android'),
  getSystemVersion: jest.fn(() => '16.0'),
};
