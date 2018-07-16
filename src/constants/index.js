const PHP_URL_MAP = {
  dev : 'https://dev-ali-mp.zhongan.com/matrix/developer/liangtiehui/',
  uat : 'https://dev-ali-mp.zhongan.com/matrix/developer/liangtiehui/',
  prod : 'https://dev-ali-mp.zhongan.com/matrix/developer/liangtiehui/'
}

const MATRIX_URL_MAP = {
  dev : 'http://matrix-test.zhongan.com/',
  uat : 'http://matrix-test.zhongan.com/',
  prod : 'http://matrix-test.zhongan.com/'
}

module.exports =  {
    PHP_URL : PHP_URL_MAP['dev'],
    MATRIX_URL : MATRIX_URL_MAP['dev'],
    DEV_PORT:8081,
    DEV_IP:'192.168.201.120',
}