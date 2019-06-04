function checkLogin() {
    var path = window.location.pathname.split('/');
    // console.log(path)
    if (localStorage.getItem('admin')) {
        if(path[path.length-3]=== 'customerportal' && localStorage.getItem('admin')=== 'true'){
            window.location.assign('/error/' + localStorage.getItem('customerId') + '/' + localStorage.getItem('name'));
        }
        else if(path[path.length-3]=== 'adminportal' && localStorage.getItem('admin')=== 'false'){
            window.location.assign('/error/' + localStorage.getItem('customerId') + '/' + localStorage.getItem('name'));
        }
        if (Number(path[path.length - 2])) {
            //    window.location.reload();
            if (path[path.length - 2] !== localStorage.getItem('customerId')) {
                window.location.assign('/error/' + localStorage.getItem('customerId') + '/' + localStorage.getItem('name'));
            }
            //  alert(path[path.length-1])
            var str = path[path.length - 1]
            let r = str.split('%20').join(" ")
            //alert(str)
            if (r !== localStorage.getItem('name')) {
                window.location.assign('/error/' + localStorage.getItem('customerId') + '/' + localStorage.getItem('name'));
            }
        }
        else {
            var url = window.location.href + '/' + localStorage.getItem('customerId') + '/' + localStorage.getItem('name');
            window.location.assign(url)
        }
    }
    else {
        if (Number(path[path.length - 2])) {
            url = 'http://ziggy-eats.herokuapp.com';
            var tempPath = '';

            for (var i = 0; i < path.length - 2; i++) {
                tempPath = tempPath + path[i] + '/'
            }

            var tempPath2 = '';
            if (tempPath[tempPath.length - 1] === '/') {
                tempPath2 = tempPath.substring(0, tempPath.length - 1);
            }
            // alert(tempPath2)
            url = url + tempPath2;
            window.location.assign(url)
        }
        
    }
}

export default checkLogin;
