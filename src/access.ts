/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
const getCol = function getCol(matrix, col){
    var column = [];
    console.log('getCol')
    for(var i=0; i < matrix.length; i++){
        console.log(matrix[i][col])
        column.push(matrix[i][col]);
    }
    return column;
}


export default function access(initialState: { currentUser?: API.CurrentUser, currentAccount?: API.CurrentAccount } | undefined) {
  const { currentUser, currentAccount } = initialState ?? {};
  console.log('access currentUser')
  console.log(currentUser)
  console.log('access currentAccount')
  console.log(currentAccount)
    let permissions = Array();
    let is_owner = false; ;
    if(currentAccount && currentAccount.hasOwnProperty('permissions')) {
        is_owner = currentAccount.is_owner;
        if (currentAccount.is_owner === false) {
            permissions = getCol(currentAccount.permissions, 'permission');
        }
         console.log('permissions permissions')
         console.log(permissions)

    }

  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    //normalRouteFilter: (route) => (is_owner || permissions.includes(route.name))
    normalRouteFilter: (route) => (is_owner || (route.hasOwnProperty('meta') && route.meta.hasOwnProperty('permission') && permissions.includes(route.meta.permission)))
  };
}
