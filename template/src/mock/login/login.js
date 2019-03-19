import Mock from 'mockjs';
export default {
    // post提交
    login: {
        mockRes: () => {
            return Mock.mock({
                code: 0,
                data: {
                    name: '@cname()'
                },
                msg: ''
            });
        }
    }
};
