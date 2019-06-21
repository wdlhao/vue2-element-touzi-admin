import { weiboUrl,weiboAppkey } from "@/utils/env";

export function shareConfig(type,obj){
    switch(type){
        case 'weibo':
            let paramsUrl = '';
            for(let key in obj){
                paramsUrl += '&'+key+'='+obj[key]
            }
            const baseUrl = weiboUrl+'?appkey='+weiboAppkey+paramsUrl
            window.open(baseUrl,'_blank','width=100,height=100,top=20,left=20,toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
            break;
    }
}