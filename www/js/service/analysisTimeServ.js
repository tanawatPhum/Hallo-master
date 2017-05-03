angular.module('moduleControlles')
.service('$timeServ',function() {

// const regexDay = /(|วัน)(| |  |   |)(จันทร์|อังคาร|พุทธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์)/gi
// const regexDay2 = /(วัน|)(| |  |   |)(จันทร์|อังคาร|พุทธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์)(   |  | |)(ที่|)(   |  | |)([0-9]|[0-9][0-9]|)/gi
// const regexTime =  /([0-9]|[0-9][0-9])(| |  |   |)โมง/gi
// const regexTime2 = /(ตี|บ่าย)(| |  |   |)([0-9]|[0-9][0-9])/gi
// const regexTime3 = /([0-9]|[0-9][0-9])(|  |   )(.|:)(|  |   )([0-9][0-9])(| |  |   )(น|น.|นาฬิกา|)/gi
// const regexDate = /วันที่(| |  |   )([1-9]|[0-9][0-9])/gi
// const regexMonth = /(|เดือน)(| |  |   )(มกรา|กุมภา|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา)(คม|ยน|)/gi
// const regexDay3 = /(วัน|วันที่|)(   |  | |)(จันทร์|อังคาร|พุทธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์)(   |  | |)(ที่)(   |  | |)([0-9]|[0-9][0-9]|)/gi
let daymore,monthmore,yearmore
let daySets = [moment().hour(7),moment().hour(13),moment().hour(18),moment().hour(23).minute(00),moment().hour(7)];
this.setDaysetting =function(obj){
  daySets=[]
  daySets.push(moment(obj.morning))
  daySets.push(moment(obj.afternoon))
  daySets.push(moment(obj.evening))
  daySets.push(moment(obj.nigh))
  daySets.push(moment(obj.other))

}

Array.prototype.flatMap = function(lambda) { 
    return Array.prototype.concat.apply([], this.map(lambda)); 
}
const cutNull = function (s){  
  return s!==null && s!==undefined 
}
const isSpace = function(v){ 
             
       return (v!=="")&&(v!==" ")&&(v!=="   ")&&(!(/^\s+$/.test(v)))
}
const cutNumber = function(v) {
  return !(/^[0-9]*$/.test(v))
}
// function timeRegex(s) {    
//      const regexTime4=[  /([1-2][0-9]|[0-9])(   |  | |)(โมง|ทุ่ม)(   |  | |)(เย็น|เช้า|)(   |  | |)([0-5][0-9]|[0-9])(   |  | |)นาที/gi
//      ,/(ตี|บ่าย)(   |  | |)([1-2][0-9]|[0-9])(   |  | |)โมง/gi
//      ,/(1?[0-9]|2[0-3])(:|.)[0-5][0-9](   |  | |)(นาฬิกา|น.|)/gi
//      ,/(1?[0-9]|2[0-3])(   |  | |)นาฬิกา(   |  | |)([0-5][0-9]|[0-9])(   |  | |)นาที/gi]  
//      const resultTimeRegex = regexTime4.map((v)=> s.match(v)).filter(cutNull).flatMap( (v) => v )  

//    // console.log('resulttime',resultTimeRegex)   
//      return  resultTimeRegex
// }
 function timeRegex(s) {    
      console.log(s)
      s= s.replace(/เที่ยงคืน/g,'00:00')
      s= s.replace(/เที่ยง/g,'12:00')
      s=s.replace(/คืนนี้/g,'20.00')
      

     const regexTime4=[  /^([1-2][0-9]|[0-9])(   |  | |)(โมง|ทุ่ม)(   |  | |)(เย็น|เช้า|)(   |  | |)([0-5][0-9]|[0-9])(   |  | |)นาที/gi
     ,/^บ่าย(   |  | |)([1-5])(   |  | |)(โมง|)/gi
     ,/^บ่าย(   |  | |)([1-5])(   |  | |)(โมง|)(   |  | |)([0-5][0-9]|[0-9])(   |  | |)นาที/gi
     ,/^ตี(   |  | |)[1-5]/g
     ,/^ตี(   |  | |)[1-5](   |  | |)([0-5][0-9]|[0-9])(   |  | |)นาที/g
     ,/^([1-2][0-9]|[0-9])(   |  | |)โมง(   |  | |)(เย็น|เช้า|)/g
     ,/^(บ่าย|ตี|ทุ่ม|)(   |  | |)(00|1?[0-9]|2[0-3])(:|\.)[0-5][0-9](   |  | |)(นาฬิกา|น\.|)/g  
     ,/^(1?[0-9]|2[0-3])(   |  | |)นาฬิกา(   |  | |)([0-5][0-9]|[0-9])(   |  | |)นาที/gi
     ,/^(1?[0-9]|2[0-3])(   |  | |)นาฬิกา/gi
     ,/^อีก(   |  | |)(\d\d\d|\d\d|\d)(   |  | |)(นาที|ชั่วโมง|ช\.ม|ชม\.)/gi
     ,/^[1-5](  |  | |)ทุ่ม/gi
     ,/อีก(   |  | |)(\d\d\d|\d\d|\d)(   |  | |)(ชั่วโมง|ช\.ม|ชม\.)(   |  | |)(\d\d\d|\d\d|\d)(   |  | |)นาที/gi
         ]  
    let temp = s.substr(0)
    let anss = []
    let st="" //temp string while cutting word
    let stss = []
    let finalanss = []
    let aaa , b
    while(temp.length>0)
    {      
      const resulRegex = regexTime4.map((v)=> {
      return v.exec(temp)
      }).filter((v)=> v!= null)
      //console.log(resulRegex)
      let tempb = resulRegex.map((v)=>v[0])      
      let mxi = -1
      let mxv = 0
       //console.log(temp)
       //console.log(tempb)
      tempb.forEach((v,i)=>{           
            if(v.trim().length>mxv)
            {               
              mxv=v.trim().length
              mxi=i
            }
      })      
      if(tempb[mxi]!==undefined){
        if(tempb.length>0){
          finalanss.push({k:b , s:st})
          //console.log({k:b,s:st})
          stss.push(st) //ประโยคที่ตัด
          //console.log(st)
          anss.push(tempb[mxi]) 
          st=tempb[mxi]        
          //console.log(st) // -->
          b=st.substr(0)  // 
          temp=temp.substr(tempb[mxi].length)             
        }
        else{
          st+=temp[0]
          temp=temp.substr(1)
        }
     }
     else
     { 
       st+=temp[0]
       temp=temp.substr(1)
     }
  } 
   finalanss.push({k:b , s:st}) //final
   stss.push(st)
   finalanss = finalanss.splice(1,finalanss.length)    
   const strtime = finalanss.map((v)=>{
     return v.k
   })
  return strtime
}
//for extract date from sentense parameter is array of sentense 
function dateRegex (s) { 
     
     var b = s.replace(/(\d\d|\d)(   |  | |)(โมง|นาฬิกา)(   |  | |)(\d\d|\d|)(   |  | |)(นาที|)/gi,'');
     var a = b.replace(/(1?[0-9]|2[0-3])(:|\.)[0-5][0-9]/gi,'');
   
     console.log(a)

     const answer = {}
     const regexPattern = [ /(เดือน|ของเดือน|)(   |  | |)(มกรา|กุมภา|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา|)(   |  | |)(คม|ยน|)(   |  | |)(\d\d\d\d|)(   |  | |)(วันนี้|วัน|)(   |  | |)(จันทร์|อังคาร|พุทธ|พุธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|)(   |  | |)(แรก|พรุ่งนี้|มะรืน|)(   |  | |)(ที่|)(   |  | |)([1-3][0-9]|[0-9]|)/gi     
     ,/(เดือน|ของเดือน|)(   |  | |)(มกรา|กุมภา|กุมภาพันธ์|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา|)(   |  | |)(คม|ยน|)(   |  | |)(\d\d\d\d|)(   |  | |)(ที่|)(   |  | |)([1-3][0-9]|[0-9]|)(   |  | |)(วันนี้|วัน|)(   |  | |)(จันทร์|อังคาร|พุทธ|พุธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|)(   |  | |)(แรก|พรุ่งนี้|มะรืน|)/gi
     ,/(วันที่|)(   |  | |)([1-3][0-9]|[0-9]|)(   |  | |)(วันนี้|วัน|)(   |  | |)(จันทร์|อังคาร|พุทธ|พุธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|)(   |  | |)(แรก|พรุ่งนี้|มะรืน|)(   |  | |)(เดือน|ของเดือน|)(   |  | |)(มกรา|กุมภา|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา|)(   |  | |)(คม|ยน|)(   |  | |)(\d\d\d\d|)/gi
     ,/(วันที่|)(   |  | |)([1-3][0-9]|[0-9]|)(   |  | |)(เดือน|ของเดือน|)(   |  | |)(มกรา|กุมภา|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา|)(   |  | |)(คม|ยน|)(   |  | |)(\d\d\d\d|)(   |  | |)(วันนี้|วัน|)(   |  | |)(จันทร์|อังคาร|พุทธ|พุธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|)(   |  | |)(แรก|พรุ่งนี้|มะรืน|)/gi
     ,/(วันนี้|วัน|)(   |  | |)(จันทร์|อังคาร|พุทธ|พุธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|แรก|พรุ่งนี้|มะรืน|)(   |  | |)(ที่|)(   |  | |)([1-3][0-9]|[0-9]|)(   |  | |)(เดือน|ของเดือน|)(   |  | |)(มกรา|กุมภา|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา|)(   |  | |)(คม|ยน|)(   |  | |)(\d\d\d\d|)/gi 
     ,/(วันนี้|วัน|)(   |  | |)(จันทร์|อังคาร|พุทธ|พุธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|แรก|พรุ่งนี้|มะรืน|)(   |  | |)(เดือน|ของเดือน|)(   |  | |)(มกรา|กุมภา|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา|)(   |  | |)(คม|ยน|)(   |  | |)(\d\d\d\d|)(   |  | |)(ที่|)(   |  | |)([1-3][0-9]|[0-9]|)/gi 
     ,/อีก(   |  | |)(\d\d\d\d|\d\d\d|\d\d|\d)(   |  | |)(วัน|สัปดาห์|อาทิตย์|เดือน|ปี)/gi
     ,/(\d\d|\d)\/(\d\d|\d)\/(\d\d\d\d|\d\d|\d)/gi
     ,/(\d\d|\d)-(\d\d|\d)-(\d\d\d\d|\d\d|\d)/gi]      
    const resulRegex = regexPattern.map((v)=>{ 
      
   if( a.match(v)==undefined) return 0
   else return a.match(v)
    
  }).filter(isSpace)     
    console.log(resulRegex)
    const size = resulRegex.map((v)=> {
    if(v[0]==undefined) return -1
    else return  v[0].length
    
  } )     
    return resulRegex[size.indexOf(Math.max(...size))].map((c) => c.trim()).filter(cutNumber) 
}

function spliteDate(a)
{ 
    
    let tempForNull = a.substr(0)
  if(a==undefined) return
   
    a  = a.replace('วันพ่อ','5 ธ.ค.')
    a  = a.replace('วันแม่','12 ส.ค.')
    a  = a.replace('ปีใหม่','1 ม.ค.'+moment().add(1,'year').year())
    a  = a.replace('สงกรานต์','13 เม.ย. ')
    a  = a.replace('วันจักรี','6 เม.ย.')
    a  = a.replace('วันปิย','23 ต.ค.')
    a  = a.replace('แรงงาน','1 พ.ค.')
    a  = a.replace('วันฉัตรมงคล​',' 5 พ.ค.')
    a  = a.replace('วันรัฐธรรมนูญ​',' 10 ธ.ค.')
    a  = a.replace('วันสิ้นปี','31 ธ.ค.')     
    a  = a.replace('อาทิตย์หน้า',moment().add(7,'day').format('DD/MM/YYYY'))
    a  = a.replace('สัปดาห์หน้า',moment().add(7,'day').format('DD/MM/YYYY'))
    a  = a.replace('เดือนหน้า',moment().locale('th').add(1,'month').format("MMMM"))  
    a  = a.replace('ปีหน้า',moment().add(1,'year').format('YYYY'))

    if(/(มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)/.test(a)==false)
    if(/(มกรา|กุมภา|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา)/.test(a))
    {     
       a= a.replace(/ธันวา/,'ธันวาคม')
       a= a.replace(/พฤษจิ/,'พฤษจิกา')
       a= a.replace(/ตุลา/,'ตุลาคม')
       a= a.replace(/กันยา/,'กันยายน')
       a= a.replace(/สิงหา/,'สิงหาคม')
       a= a.replace(/กรกฎา/,'กรกฎาคม')
       a= a.replace(/มิถุนา/,'มิถุนายน')
       a= a.replace(/พฤษภา/,'พฤษภาคม')
       a= a.replace(/เมษา/,'เมษายน')
       a= a.replace(/มีนา/,'มีนาคม')
       a= a.replace(/กุมภา/,'กุมภาพันธ์')
       a= a.replace(/มกรา/,'มกราคม')
    }
    
    
    if( /เดือน(   |  | |)([1-3][0-9]|[0-9])/g.test(a))
     {      
       a= a.replace(/เดือน(   |  | |)12/g,'ธันวาคม')
       a= a.replace(/เดือน(   |  | |)11/g,'พฤษจิกายน')
       a= a.replace(/เดือน(   |  | |)10/g,'ตุลาคม')
       a= a.replace(/เดือน(   |  | |)9/g,'กันยายน')
       a= a.replace(/เดือน(   |  | |)8/g,'สิงหาคม')
       a= a.replace(/เดือน(   |  | |)7/g,'กรกฏาคม')
       a= a.replace(/เดือน(   |  | |)6/g,'มิถุนายน')
       a= a.replace(/เดือน(   |  | |)5/g,'พฤษภาคม')
       a= a.replace(/เดือน(   |  | |)4/g,'เมษายน')
       a= a.replace(/เดือน(   |  | |)3/g,'มีนาคม')
       a= a.replace(/เดือน(   |  | |)2/g,'กุมภาพันธ์')
       a= a.replace(/เดือน(   |  | |)1/g,'มกราคม')
     }

     if(/(ม\.ค|ก\.พ|มี\.น|เม\.ย|พ\.ค|มิ\.ย|ก\.ค|ส\.ค|ก\.ย|ต\.ค|พ\.ย|ธ\.ค)(\.|)/g.test(a))
     {
       a= a.replace(/ธ.ค(\.|)/g,'ธันวาคม')
       a= a.replace(/พ.ย(\.|)/g,'พฤษจิกายน')
       a= a.replace(/ต.ค(\.|)/g,'ตุลาคม')
       a= a.replace(/ก.ย(\.|)/g,'กันยายน')
       a= a.replace(/ส.ค(\.|)/g,'สิงหาคม')
       a= a.replace(/ก.ค(\.|)/g,'กรกฎาคม')
       a= a.replace(/มิ.ย(\.|)/g,'มิถุนายน')
       a= a.replace(/พ.ค(\.|)/g,'พฤษภาคม')
       a= a.replace(/เม.ย(\.|)/g,'เมษายน')
       a= a.replace(/มี.ค(\.|)/g,'มีนาคม')
       a= a.replace(/ก.พ(\.|)/g,'กุมภาพันธ์')
       a= a.replace(/ม.ค(\.|)/g,'มกราคม')
     }
     if(/(อา\.|จ\.|พ\.|พฤ\.|ศ\.|ส\.|อา\.)/g.test(a)){
        a= a.replace(/อา\./g,'วันอาทิตย์')
       a= a.replace(/จ\./g,'วันจันทร์')
       a= a.replace(/อ\./g,'วันอังคาร')
       a= a.replace(/พ\./g,'วันพุธ')
       a= a.replace(/พฤ\./g,'วันพฤหัสบดี')
       a= a.replace(/ศ\./g,'วันศุกร์')
       a= a.replace(/ส\./g,'วันเสาร์')
     }
  
  const answer = {}
   
     const regexPattern = [ /^(เดือน|)(   |  | |)(มกราคม|กุมภา|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)(   |  | |)(\d\d\d\d|)(   |  | |)(วัน|)(   |  | |)(จันทร์|อังคาร|พุธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|)(   |  | |)(3[0-1]|[1-2][0-9]|[0-9]|)/gi     
     ,/^(เดือน|)(   |  | |)(มกราคม|กุมภา|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)(   |  | |)(\d\d\d\d|)(   |  | |)(3[0-1]|[1-2][0-9]|[0-9]|)(   |  | |)(วัน|)(   |  | |)(จันทร์|อังคาร|พุธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|)(   |  | |)/gi
     ,/^(วันที่|)(   |  | |)(3[0-1]|[1-2][0-9]|[0-9]|)(   |  | |)(วัน|)(   |  | |)(จันทร์|อังคาร|พุธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|)(   |  | |)(เดือน|)(   |  | |)(มกราคม|กุมภา|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)(   |  | |)(\d\d\d\d|)/gi
     ,/^(3[0-1]|[1-2][0-9]|[0-9]|)(   |  | |)(เดือน|)(   |  | |)(มกราคม|กุมภา|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)(   |  | |)(\d\d\d\d|)(   |  | |)(วัน|)(   |  | |)(จันทร์|อังคาร|พุธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|)(   |  | |)/gi
     ,/^(วัน|)(   |  | |)(จันทร์|อังคาร|พุธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์)(   |  | |)(3[0-1]|[1-2][0-9]|[0-9]|)(   |  | |)(เดือน|)(   |  | |)(มกราคม|กุมภา|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)(   |  | |)(\d\d\d\d|)/gi 
     ,/^(วัน|)(   |  | |)(จันทร์|อังคาร|พุธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์)(   |  | |)(เดือน|)(   |  | |)(มกราคม|กุมภา|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)(   |  | |)(\d\d\d\d|)(   |  | |)(3[0-1]|[1-2][0-9]|[0-9]|)/gi 
     ,/^(\d\d|\d)\/(\d\d|\d)\/(\d\d\d\d|\d\d|\d)/gi
     ,/^(\d\d|\d)-(\d\d|\d)-(\d\d\d\d|\d\d|\d)/gi
     ,/^วัน(   |  | |)(จันทร์|อังคาร|พุธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์)/gi
     ,/^(จันทร์|อังคาร|พุธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์)/gi
     ,/^(วันนี้|วันพรุ่งนี้|วันมะรืน)/gi
     ,/^(พรุ่งนี้|มะรืน)/gi
     ,/^(\d\d|\d)(   |  | |)-(   |  | |)(\d\d|\d)(   |  | |)(มกราคม|กุมภา|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)/gi
     ,/^อีก(   |  | |)(\d\d\d\d|\d\d\d|\d\d|\d)(   |  | |)(วัน|สัปดาห์|อาทิตย์|เดือน|ปี)/gi     
     ,/^วันที่(   |  | |)(\d\d|\d)/gi
     ]      
    let temp = a.substr(0)
    let anss = []
    let st="" //temp string while cutting word
    let stss = []
    let finalanss = []
      let aaa , b
    while(temp.length>0)
    {      
      const resulRegex = regexPattern.map((v)=> {
      return v.exec(temp)
      }).filter((v)=> v!= null)
      //console.log(resulRegex)
      let tempb = resulRegex.map((v)=>v[0])      
      let mxi = -1
      let mxv = 0
         console.log(temp)
        console.log(tempb)
      tempb.forEach((v,i)=>{           
            if(v.trim().length>mxv)
            {               
              mxv=v.trim().length
              mxi=i
            }
      })      
      if(tempb[mxi]!==undefined){
       
        if(tempb.length>0){
          
          finalanss.push({k:b , s:st})
          stss.push(st) //ประโยคที่ตัด
          // console.log(st)
          anss.push(tempb[mxi]) 
          st=tempb[mxi]        
         // console.log(st) // -->
          b=st.substr(0)  // 
          temp=temp.substr(tempb[mxi].length)             
        }
        else{
          st+=temp[0]
          temp=temp.substr(1)
        }
     }
     else
     { 
       st+=temp[0]
       temp=temp.substr(1)
     }
  } 

  finalanss.push({k:b , s:st})
  //console.log(finalanss)
  stss.push(st)
  stss= stss.filter((v)=>{
      return v!==" "
    })
   //console.log(a)
  // console.log(anss)
//   console.log(stss)
   
   //-----ตัดคำ
   let senti = []
   let sent = []
   let flag = false
   anss.map((v)=>{
     senti.push(a.search(v))
   })
   //console.log(senti)
   for(let i=0;i<=senti.length-1;i++)
   {
     //console.log(senti[i])
     //console.log(stss[i])
     if(i==0 && senti[i]!==0){
        flag=true
     }
     sent.push(a.substr(senti[i],senti[i+1]-senti[i]))
   }
   //console.log('size:',stss.length,flag)
   if(flag==true){
     if(stss.length>=2){         
      
        let tempStrArr = stss[0]+stss[1]
        stss[1]=tempStrArr
        finalanss[1].s=tempStrArr
        finalanss[0].s=""
        stss=stss.splice(1)
     } 
   }
  //   console.log(finalanss)
  //  console.log(anss,anss.length)
  //  console.log(stss,stss.length) 
   
  finalanss=finalanss.splice(1)
 
 return finalanss

}
function createTimeWithCheck( timeR, hr   ){
    
    if(timeR.length==2){
              return { 'H':(parseInt( timeR[0])+hr).toString() , 'm':timeR[1] }
    }else {
              return { 'H':(parseInt( timeR[0])+hr).toString(), 'm': 0 }
    } 
} 
function convertTimeToNumber( s ) {
     console.log(s)
     const timeNumber = /(\d\d|\d)/gi     
     const mong = /โมง/
     const naliga = /นาฬิกา/
     const natee = /นาที/
     const bai = /บ่าย/
     const tee = /ตี/
     const toom = /ทุ่ม/
     const shao = /เช้า/
     const yen = /เย็น/       
     const eek = /อีก/
     const eekhm = /อีก(   |  | |)(\d\d\d|\d\d|\d)(   |  | |)(ชั่วโมง|ช\.ม|ชม\.)(   |  | |)(\d\d\d|\d\d|\d)(   |  | |)นาที/  
     const ac= s.map( (v) =>{
        console.log(v)
           
     const timeR= v.match(timeNumber)    
     if(eekhm.test(v)){
        
       const s = v.match(/(\d\d\d|\d\d|\d)/g)     
         
              const dd = moment().add(parseInt(s[0]),'hour').add(parseInt(s[1]),'minute') 
              timeR[1]=dd.minute()
              timeR[0]=dd.hour() 
              daymore=dd.date()
              monthmore=dd.month()
              yearmore=dd.year()                   
              return createTimeWithCheck(timeR,0)
        

     }else if(eek.test(v)){
        if(natee.test(v)){            
              const dd =moment().add(parseInt(timeR),'minute')
              timeR.push(dd.minute())
              timeR[0]=dd.hour()     
              daymore=dd.date()
              monthmore=dd.month()
              yearmore=dd.year()

              return createTimeWithCheck(timeR,0)
        }else if(/ชั่วโมง|ช\.ม|ชม\./.test(v)){
            const dd =moment().add(parseInt(timeR),'hour')
            timeR.push(dd.minute())
            timeR[0]=dd.hour()    
              daymore=dd.date()
              monthmore=dd.month()
              yearmore=dd.year()        
            return createTimeWithCheck(timeR,0)
        }        
      }
     
     else if(shao.test(v)){
          if(timeR[0]==6||timeR[0]>6)
          return createTimeWithCheck(timeR,0)

          return createTimeWithCheck(timeR,6)
     }
     else  if( bai.test(v) || yen.test(v) ) {
        
        return createTimeWithCheck(timeR,12)           
     }else if(tee.test(v)) {
        
        return createTimeWithCheck(timeR,0)    
     }else if(toom.test(v)) {       
       
        return createTimeWithCheck(timeR,18)    
     }else if( mong.test(v)) {            
        if(timeR[0]<6){
           
           
          return createTimeWithCheck(timeR,12) 
        }else if(timeR[0]!=6 ){
                 
                   return createTimeWithCheck(timeR,0)    
              }else{
                    if(timeR.length==2){
                      return { 'H':timeR[0] , 'm':timeR[1] , 'o' : 'chao or yen' }
                    }else {
                      return { 'H':timeR[0], 'm': 0 , 'o' : 'chao or yen'  }
                    }
             }             
    }else if(naliga.test(v)){
       return createTimeWithCheck(timeR,0)

    }else{
        
       return createTimeWithCheck(timeR,0)    
     }      
  })   
  const result = {'input': s, 'result': ac}
  console.log('ttt',result)
  return result
}

function convertDateToNumber( s ) {   //return {input,[]result }
    console.log(s)
     
    const date = [/จันทร์/,/อังคาร/,/พุธ/,/พฤหัส/,/ศุกร์/,/เสาร์/,/อาทิตย์/]
    const datespec = [/วันนี้/,/พรุ่งนี้/,/มะรืน/]     
    const dateNumbers = /(\d\d\d\d|\d\d\d|\d\d|\d)/
  
    const month = [/มกรา/,/กุมภา/,/มีนา/,/เมษา/,/พฤษภา/,/มิถุนา/,/กรกฎา/,/สิงหา/,/กันยา/,/ตุลา/,/พฤศจิกา/,/ธันวา/]
  
    let year
    const datespec2 = datespec.map((v , j)=> {     
      if(v.test(s)!=false)
      {
        return j
      }
    }).filter(cutNull)
   //console.log(s, datespec2 )   
     const dateresult= date.map( (v , j)=> {
      if(v.test(s) !== false )
      {
        return j+1
      }    
    }).filter(cutNull)
    const monthresult = month.map( (v , j)=>{
     if(  v.test(s) !== false )
      {
        return j
      }
  }).filter(cutNull)    
    const dateNumberresult = s.map((v)=>{     
      const cv = v.match(dateNumbers)
      if(cv !== null) 
        return  cv[0]      
      else 
        return '' 
    }).filter(isSpace)     
  console.log(s)
  if(/อีก/.test(s))
  {  //  const eek = [/วัน/,/สัปดาห์/,/เดือน/,/ปี/]
       let dateNum ;
       let dayWeek;
       let monthNum;       
    if(/วัน/.test(s))
    { 
        let dd=moment().add(parseInt(dateNumberresult[0]),'d') 
        dateNumberresult[0]=dd.date()
        monthresult[0]=dd.month()  
        year=dd.year()
        dateresult[0]=NaN
          
    }else if(/(สัปดาห์|อาทิตย์)/.test(s)){
         let dd=moment().add(parseInt(dateNumberresult[0]),'w') 
        dateNumberresult[0]= dd.date()
        monthresult[0]=dd.month() 
         year=dd.year()
     
        
        dateresult[0]=NaN
    }else if(/เดือน/.test(s)){
      let dd=moment().add(parseInt(dateNumberresult[0]),'M') 
        dateNumberresult[0]=dd.date()
        monthresult[0]=dd.month()
         year=dd.year()
        dateresult[0]=NaN
    }else if(/ปี/.test(s)){
        let dd=moment().add(parseInt(dateNumberresult[0]),'Y') 
        dateNumberresult[0]=dd.date()
        monthresult[0]=dd.month()
        dateresult[0]=NaN
        year=dd.year()
    }

  }else    if(/\d\d\d\d/.test(s)){       
      year=parseInt(s[0].match(/\d\d\d\d/))
      if(year>2550)
      {
          year=year-543
  
      }     
     
    }
   console.log(year)
    if(/(\d\d|\d)\/(\d\d|\d)\/(\d\d\d\d|\d\d|\d)/.test(s) || /(\d\d|\d)-(\d\d|\d)-(\d\d\d\d|\d\d|\d)/.test(s) ){
      
     const dateformat=  s[0].match(/(\d\d\d\d|\d\d|\d)/g) 
     console.log(dateformat)
     dateNumberresult[0]=dateformat[0]
     monthresult[0]=dateformat[1]-1
     if(dateformat[2].length==4){      
     if(parseInt(dateformat[2])>2550)
     {
          year=parseInt(dateformat[2])-543
 
     }
     else{
         year=dateformat[2]
     }
    
     }else  {if(parseInt(dateformat[2])>50)
     {
               year=2000+parseInt(dateformat[2])-43
     }else{
               year=2000+dateformat[2]
     }}


    }

    
  
  const result= { 'datenumber':  parseInt( dateNumberresult[0]) , 'date': dateresult[0] ,  'month': monthresult[0],'year':year ,'option': datespec2[0]  } //option คือ พวก วันนี้ พรุ่งนี้
  console.log(result)
  const timeObj=  { 'time': result  , 'strDate': s }
  return timeObj 
}


function convertTime( s ) {
    if (s===[] ) return 

     const regexTime =  /([1-2][0-9]|[0-9])(   |  | |)โมง/gi 

     if(regexTime.test(s) !== false )
     {

       const result = /(\d\d|\d)/
       const resultMatch = s.match(result)
      // console.log(resultMatch[0])
      
     }
     const regexTime2 = /(ตี|บ่าย)(   |  | |)([1-2][0-9]|[0-9])/gi
     const regexTime3 = /(1?[0-9]|2[0-3]):[0-5][0-9](   |  | |)(นาฬิกา|น.|)/gi
}
 function addYear(date,mm)
 {  console.log(date,daymore,monthmore,yearmore)
   if(date!==undefined && daymore!=date.datenumber)
   {
      
     date.datenumber=daymore
     mm.date(daymore)
      
   }
   if(monthmore!==undefined && monthmore!=date.month)
   {
     date.month=monthmore
     mm.month(monthmore)
   }
   
   if(date.year!==undefined)
   {
     if(yearmore!==undefined && mm.year!==yearmore)
     {
       return mm.year(yearmore)
     }
     return mm.year(date.year)
   }else
   {
      if(yearmore!==undefined)
           return mm.year(yearmore)

     return mm
   }
 }
 function createTimeObject(date,h,m)
 {      
   
    if(date.datenumber==1&&date.month==0)
   {
        let dateR = moment().date(1).month(0).add(1,'year').hour(parseInt(h)).minute(parseInt(m))
        dateR=addYear(date,dateR)
        return dateR
   }
  else if( !isNaN(date.datenumber) && date.date !== undefined && date.month !== undefined )
   {      
          let dateR = moment().date(date.datenumber).month(date.month).hour(parseInt(h)).minute(parseInt(m))
          dateR=addYear(date,dateR)
          return dateR
   }
     
        // วันที่ 12  or  วัน จันทร์ ที่ 15  ==> เดือนนี้
    else  if( ( !isNaN(date.datenumber) && date.date === undefined && date.month === undefined ) || ( !isNaN(date.datenumber) && date.date !== undefined && date.month === undefined ) ) {         

         // console.log('Match Date number ',dateR)
          let dateR = moment().date(date.datenumber).hour(parseInt(h)).minute(parseInt(m))
          dateR=addYear(date,dateR)
          return dateR
      } else if ( isNaN(date.datenumber) && date.date !== undefined && date.month === undefined) {  // วัน อังคาร   ==> เดือนนี้   
        //
            if(moment().isoWeekday() == date.date){  // วันอังคาร แบบ ไม่ระบุ เวลา เท่ากับ วันนี้ รึป่าว
                if( moment().isoWeekday(date.date).hour(parseInt(h)).minute(parseInt(m)) >= moment().isoWeekday(date.date)  ) {   //เชคเวลาว่า ผ่านไปรึยัง 
                  //console.log('Match day of week',dateR)                
                    let dateR = moment().isoWeekday(date.date).hour(parseInt(h)).minute(parseInt(m))
                    dateR=addYear(date,dateR)
                    return dateR
                }
                else {            
                  let dateR = moment().isoWeekday(date.date).add(1,'week').hour(parseInt(h)).minute(parseInt(m))
                  dateR=addYear(date,dateR)
                  return dateR 
                }
            }              
           else  { // วันไม่เท่าวันนี้ จะ บวก 1 อาทิตย์

                 if(moment().isoWeekday(date.date)< moment()) //เช็คว่า วันนั้นๆในสัปดาห์ ผ่านมาแล้วหรือยัง ถ้าผ่านมาแล้ว จะ+1 week
                 {
                         
                         let dateR = moment().isoWeekday(date.date).add(1,'week').hour(parseInt(h)).minute(parseInt(m))
                         dateR=addYear(date,dateR)
                          return dateR

                 }else  if(moment().isoWeekday(date.date)> moment()) {
                        let dateR = moment().isoWeekday(date.date).hour(parseInt(h)).minute(parseInt(m))
                        dateR=addYear(date,dateR)
                         return dateR
                 }
                //console.log('Match day of week 2',dateR)              
          }           
    } else  if( isNaN(date.datenumber) && date.date === undefined && date.month !== undefined)     {            // มีนาคม ==> วันแรก ของ เดือนนั้นๆ
            let dateR = moment().month(date.month).date(1).hour(parseInt(h)).minute(parseInt(m))
            dateR=addYear(date,dateR)
            console.log('Match Month  ',dateR)
            return dateR
    } else if( !isNaN(date.datenumber) && date.date !== undefined && date.month === undefined)   {          
          let dateR = moment().date(date.datenumber).hour(parseInt(h)).minute(parseInt(m))
          dateR=addYear(date,dateR)
          console.log('Match Date number ',dateR)
          return dateR
    } else if( ( !isNaN(date.datenumber) && date.date !== undefined && date.month !== undefined ) || (!isNaN(date.datenumber) && date.date === undefined && date.month !== undefined) )  {  //วัน จันทร์ 14 มีนา or 15 เมษา  => มีวันที่แล้ว
          let dateR = moment().date(date.datenumber).month(date.month).hour(parseInt(h)).minute(parseInt(m))
          dateR=addYear(date,dateR)
          console.log('datenumber date month',dateR)
          return dateR
    } else if(  isNaN(date.datenumber) && date.date === undefined && date.month === undefined ) { //ไม่ระบุ วันที่  
           let DateR
           if(date.option!=undefined){
               console.log('match case today')
               switch(date.option)
               {
                 case 0: dateR = moment().hour(parseInt(h)).minute(parseInt(m))  
                        break
                 case 1: dateR = moment().add(1,'day').hour(parseInt(h)).minute(parseInt(m))  
                        break 
                 case 2: dateR = moment().add(2,'day').hour(parseInt(h)).minute(parseInt(m))  
                        break       
               }              
           }
           else {
           
            dateR = moment().hour(parseInt(h)).minute(parseInt(m))   
           }                  
        dateR=addYear(date,dateR)
        console.log(dateR)
        return dateR
      }
}
function mergeAndCreateDateAndTime ( time, date) 
{
     console.log(date, time)
     if(time.result.length!=0){
        return time.result.map( (v) => {         
          if(v !== undefined )                 
          return createTimeObject(date.time,v.H,v.m)
        })
     } else {        
       if( date.strDate.length!=0)
       console.log(date)
          return  date.strDate.map((v) => {
              if( v ==='วันนี้'){

                time = daySets.filter((v) =>{
                  if(v.hour() == moment().hour() ){ //next to compare minute
                      if(v.minute() > moment().minute())
                      {
                        return moment().hour(v.hour).minute(v.minute())
                      }
                  } 
                  if(v.hour() > moment().hour()){
                    return moment().hour(v.hour()).minute(v.minute())
                  }
                 })
              if(time.length!=0) //have result relate
              {
                time = time[0]
                return createTimeObject(date.time,time.hour(),time.minute())
              }
                 return createTimeObject(date.time,moment().hour(),moment().minute())
              }
              else 
              {
                 return createTimeObject(date.time,daySets[4].hour(),0)
              }
           })
       
     }

}
function thaiRegexTime( v ) {   
          if(v==undefined) return   ""
          console.log(v)     
          const resultTime  = convertTimeToNumber(timeRegex(v.s))
          const resultDate =  convertDateToNumber(dateRegex(v.k))
          //console.log("-----------------------------------------")
          //console.log('input ',v)         
          const a = mergeAndCreateDateAndTime(resultTime,resultDate)
       
          // console.log('output',a)
          //console.log("-----------------------------------------")
          const result =  {'input': v.s , 'output': a ,'resultdate':resultDate.strDate,'resultTime':resultTime.input }
          //console.log(result) 
         return   result
}
function replaceabbreviation (s)
{
   console.log(s)

  if(/พ\.ศ\./.test(s))
  {
     const a = s.match(/พ\.ศ\./)
     a.map((v)=>{
       s=s.replace(/พ\.ศ\./,' ')
     })

  }
  if(/พศ/.test(s))
  {
     const a = s.match(/พศ/g)
     a.map((v)=>{
       s=s.replace(/พศ/,' ')
     })

  }
  if(/พ\.ศ/.test(s))
  {
     const a = s.match(/พ\.ศ/g)
     a.map((v)=>{
       s=s.replace(/พ\.ศ/,' ')
     })

  }
   
 
   if(/อีก(   |  | |)(\d\d\d|\d\d|\d)(   |  | |)อาทิตย์/.test(s))
   {
     return s
   }
   
   const word = [/จ\./g,/อ\./g,/พ\./g,/พฤ\./g,/ศ\./g,/ส\./g,/อา\./g,/วนน\./g,/วพนน\./g,/วมรร\./g,/วทท\./g]
  //  const word2 =[/จันทร์/gi,/อังคาร/gi,/พุธ/gi,/พฤหัส/gi,/ศุกร์/gi,/เสาร์/gi,/อาทิตย์/gi,/พรุ่งนี้/gi,/มะรืน/gi]
   const word2 =[/จันทร์/g,/อังคาร/g,/พุธ/g,/พฤหัส/g,/ศุกร์/g,/เสาร์/g,/อาทิตย์/g,/วันนี้/gi,/พรุ่งนี้/g,/มะรืน/g,/วันที่/g ]
   const fullword = ['จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์','อาทิตย์','วันนี้','วันพรุ่งนี้','วันมะรืน','วันที่']  
   const fullword3 =[ 'วันจันทร์','วันอังคาร','วันพุธ','วันพฤหัสบดี','วันศุกร์','วันเสาร์','วันอาทิตย์','วันนี้','วันพรุ่งนี้','วันมะรืน','วันที่']
   const strword = ['จ.','อ.','พ.','พฤ.','ศ.','ส.','อา.','วนน.','วพนน.','วมรร.','วทท.'] 
   const strword2=['จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์','อาทิตย์','นนี้','พรุ่งนี้','มะรืน','วันที่']   
         
  s = s.replace(/วันนี้/g,'วนน.')
  s = s.replace(/วันที่/g,'วทท.')
    
 
   word.forEach((v,i)=>{ 
          while ((match = v.exec(s)) != null) {
            // console.log( v ,"match found at " + match.index);
              s = s.replace(strword[i],fullword[i])               
           //console.log(s)
          }      
   })  
  // console.log(s)
    word2.forEach((v,i)=>{ 
          while ((match = v.exec(s)) != null) {
          // console.log( v ,"match found at " + s.substr(match.index-3,match.index));
           if( /วัน/.test(s.substr(match.index-3,match.index)))
           {
             //console.log('hdhd')
           }
           else{
             s = s.replace( word2[i] , strword[i])         
           }
         //  console.log(s)
          }      
   }) 
    word.forEach((v,i)=>{ 
          while ((match = v.exec(s)) != null) {
            //console.log( v ,"match found at " + match.index);
              s = s.replace(strword[i],fullword3[i])               
           // console.log(s)
          }      
   })  
 
  return s
}
function spacialcase(s){
  console.log(s)
  
  if(/(จันทร์|อังคาร|พุธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์)(   |  | |)(\d\d|\d)(   |  | |)(โมง|นาฬิกา)/.test(s)){
      const cas = ['จันทร์','อังคาร','พุธ','พฤหัส','ศุกร์','เสาร์','อาทิตย์']
      cas.forEach((value,index)=>{
        if(s.search(value)!=-1)
        {
         s= s.replace(value,value+" เวลา ")
        }
      })

  }
  
  if(/เที่ยง(   |  | |)ครึ่ง/.test(s))
  {
     const a = s.match(/เที่ยง(   |  | |)ครึ่ง/)
     a.map((v)=>{
       s=s.replace(/เที่ยง(   |  | |)ครึ่ง/,'12:30')
     })

  }
  if(/เที่ยงคืน(   |  | |)ครึ่ง/.test(s))
  {
     const a = s.match(/เที่ยงคืน(   |  | |)ครึ่ง/)
     a.map((v)=>{
       s=s.replace(/เที่ยงคืน(   |  | |)ครึ่ง/,'00:30')
     })

  }
 


  if(/(บ่าย|ตี|)(   |  | |)([1-6])(   |  | |)(โมง|ทุ่ม)(   |  | |)ครึ่ง/.test(s))
  {

     const a = s.match(/(บ่าย|ตี|)(   |  | |)([1-6])(   |  | |)(โมง|ทุ่ม)(   |  | |)ครึ่ง/g)
     a.map((v)=>{
       s=s.replace('ครึ่ง',' 30 นาที')
     })

  }
  
   if(/โมง(   |  | |)ตรง/.test(s))
  {
     const a = s.match(/โมง(   |  | |)ตรง/g)
     a.map((v)=>{
       s=s.replace('ตรง','')
     })

  }
  if(/(ตอน|ช่วง)บ่าย/.test(s))
  {
     const a = s.match(/(ตอน|ช่วง)บ่าย/g)
     a.map((v)=>{
       s=s.replace(/(ตอน|ช่วง)บ่าย/, daySets[1].format("HH:mm"))
     })

  }
  if(/(ตอน|ช่วง)เช้า/.test(s))
  { 0
     const a = s.match(/(ตอน|ช่วง)เช้า/g)
     a.map((v)=>{
       s=s.replace(/(ตอน|ช่วง)เช้า/,daySets[0].format("HH:mm"))
     })

  }
  if(/(ตอน|ช่วง)เย็น/.test(s))
  {
     const a = s.match(/(ตอน|ช่วง)เย็น/g)
     a.map((v)=>{
       s=s.replace(/(ตอน|ช่วง)เย็น/,daySets[2].format("HH:mm"))
     })

  }
  if(/(ตอน|ช่วง)หัวค่ำ/.test(s))
  {
     const a = s.match(/(ตอน|ช่วง)หัวค่ำ/g)
     a.map((v)=>{
       s=s.replace(/(ตอน|ช่วง)หัวค่ำ/,'19:00')
     })

  }
  if(/(ตอน|ช่วง|)พลบค่ำ/.test(s))
  {
     const a = s.match(/(ตอน|ช่วง|)พลบค่ำ/g)
     a.map((v)=>{
       s=s.replace(/(ตอน|ช่วง|)พลบค่ำ/,'18:00')
     })

  }
 
  if(/ค่ำ(นี้|)/.test(s)){
     const a = s.match(/ค่ำนี้/g)
     a.map((v)=>{
       s=s.replace(/ค่ำนี้/,'19:00')
     })

  }
  if(/(ตอน|ช่วง|หัว)ค่ำ/.test(s))
  {
     const a = s.match(/(ตอน|ช่วง)ค่ำ/g)
     a.map((v)=>{
       s=s.replace(/(ตอน|ช่วง)ค่ำ/,daySets[3].format("HH:mm"))
     })

  }
  if(/(ตอน|ช่วง)เช้ามืด/.test(s))
  {
     const a = s.match(/(ตอน|ช่วง)เช้ามืด/g)
     a.map((v)=>{
       s=s.replace(/(ตอน|ช่วง)เช้ามืด/,'05:00')
     })

  }
  
  if(/คืนนี้/.test(s))
  {
     const a = s.match(/คืนนี้/g)
     a.map((v)=>{
       s=s.replace(/คืนนี้/,'20:00')
     })

  }
 
  if( /วันที่(   |  | |)(\d\d|\d)\/(\d\d|\d)\/(\d\d\d\d|\d\d|\d)/.test(s) || /วันที่(   |  | |)(\d\d|\d)-(\d\d|\d)-(\d\d\d\d|\d\d|\d)/.test(s) ){
    s=s.replace('วันที่','')
    console.log(s)
  }

    s =  s.replace('หนึ่ง',' 1 ')
    s =  s.replace('สอง',' 2 ')
    s =  s.replace('สาม',' 3 ')
    s =  s.replace('สี่',' 4 ')
    s =  s.replace('ห้า',' 5 ')
    s =  s.replace('หก',' 6 ')
    s =  s.replace('เจ็ด',' 7 ')
    s =  s.replace('แปด',' 8 ')
    s =  s.replace('เก้า',' 9 ')
    
return s
 
}

this.splitWordWithPlusSign=function(s){     
     s= replaceabbreviation(s)
     s= spacialcase(s)
    const input =  spliteDate(s)
     if(input.length==0) //สำหรับcase ไม่มีวันที่ ไดๆ
     {
       return this.splitWordWithPlusSign('วันนี้  ' +s)
     }
     
    if(input === undefined) {
        const ans = thaiRegexTime(s)
        console.log(ans)
        if(ans === undefined) return
        else 
        { 
          //console.log(ans)
          var aa=[]
          aa.push(ans)  
         //  console.log(aa)    
        return aa
        }
    }
          
   return  input.map( v =>  thaiRegexTime(v) )    
}

// const testSet1 = text3.map( (v) =>  thaiRegexTime(v)  )

// console.log(...testSet1)

// testSet1.forEach( (v) => {
//   if(v.output!==undefined){
//       v.output.forEach( (f) => {
//         if(f!= undefined)
//         console.log(f.locale('th').format("dddd, MMMM Do YYYY, h:mm:ss "))         
//       })   
//     }
// }) 
//cutstring with date keyword
// function spliteDate(s) 
// {   
//   let input = s
//   console.log('print input',s)
 
//   const dateregex4 = /(วันนี้|วันพรุ่งนี้|วันมะรืน|วันที่)(   |  | |)(วันจันทร์|วันอังคาร|วันพุธ|วันพฤหัส|วันศุกร์|วันเสาร์|วันอาทิตย์|)/gi
//   const dateregex5 = /(วันจันทร์|วันอังคาร|วันพุธ|วันพฤหัส|วันศุกร์|วันเสาร์|วันอาทิตย์|)/gi
//   const regexes = [dateregex4]
   
//    var valueA=[],valueB =[] 
//    var tempA=["จันทร์","พรุ่งนี้","พฤหัส","พุธ","มะรืน","วันนี้","ศุกร์","อังคาร","อาทิตย์","เสาร์","วันที่"]
//    tempA.sort()
//    for(let i =0;i<tempA.length;i++)
//    {
//      valueA[tempA[i]] = i+1
//    }  
//   valueB["วันจันทร์"]= 1
//   valueB["วันพรุ่งนี้"]=2
//   valueB["วันพฤหัส"]=3
//   valueB["วันพุธ"]=4
//   valueB["วันมะรืน"]=5
//   valueB["วันที่"]=6
//   valueB["วันนี้"]=7
//   valueB["วันศุกร์"]=8
//   valueB["วันอังคาร"]=9
//   valueB["วันอาทิตย์"]=10
//   valueB["วันเสาร์"]=11
 

//  const output = regexes.map((v)=>{      
//    const sa = s.match(v)
//           .filter(isSpace)
// console.log(s)
//  console.log(s.match(v))
//    const removespace=sa.map((v)=> v.trim())
//   //  console.log(removespace)
//    var removeDub=removespace.filter( function(item,pos,self){
            
//             return self.indexOf(item) == pos
//       })

//   var removeDub = removeDub.sort()
//     console.log(removeDub)
//   if(removeDub.length===0){return} 
//   const temp= removeDub.map((v)=>{
//      console.log(v)
//      //const index = s.indexOf(v)
//       index = [] 
//        let i =0
//        let output =0    
//       while(true)
//       {                    
//           i=s.indexOf(v,i)  
//           if(i==-1)break
//           index.push(i)
//           ++i      
//         }      
//       console.log(index)
      
//      return index })

    
//     return { 'data': removeDub ,  'output': temp }
//  })
// console.log(output)
// const a = output[0]
// const b = output[1]
// if(a === undefined || b === undefined) return
 
// // console.log( a) 
// // console.log( b)

// let i =0 ,j=0;
// let anss=[]
// let ansNum=[]

// while(i<a.data.length || j<b.data.length)
// {
//    if(i===a.data.length)
//    {
//      i=a.data.length
//    }
//    if(b===b.data.length)
//    {
//      j=b.data.length
//    }

//  // console.log(a.data[i],valueA[a.data[i]] ,"----",b.data[j],valueB[b.data[j]] )   
//  // console.log(i,"==",j,"==", valueB[b.data[j]])
//   if( valueA[a.data[i]] === valueB[b.data[j]] )
//   {
    
//     anss.push(b.data[j])
//         console.log(a.output[i] ,"--",b.output[j])
//     let h=0,k=0
//     let ss=[]
//     var d = a.output[i].concat(b.output[j])
//     var e = d.filter(function (item, pos) {return d.indexOf(item) == pos});
//     e=e.sort((a,b)=>( a-b))
//     let at=e
//     e.forEach((v)=>{     
//       if(at.indexOf((v+3))!== -1)
//         {e.splice(at.indexOf((v+3)),1)}
//     }) 
//     ansNum.push(e)
//     i++
//     j++
//   }else if(valueA[a.data[i]] < valueB[b.data[j]] ) //A<
//   {
//      anss.push(a.data[i])
//      ansNum.push(a.output[i])  
//      i++
//   } 
//   else{  //B<
//      anss.push(b.data[j])
//      ansNum.push(b.output[j])
//      j++
//   }
// }
// console.log(anss)
// console.log(ansNum) 
// console.log(a)
// let ansNum2 = ansNum.flatMap((v)=> v)
// ansNum2 = ansNum2.sort((a,b)=> a - b)
// console.log(ansNum2)
//   let aaa = ansNum2
//   let ans =[]  
//   const bb = aaa.reduce((ac,va)=>{  
//      //console.log(ac , va)
//     // console.log(s.substring(ac , va))
//      ans.push(s.substring(ac , va))
//      return  ac=va })   

//   ans.push(s.substring(aaa[aaa.length-1]))
//   let ans2=ans.filter((v) =>{
//     return v!="วัน" })
//   console.log(ans2)
//   return ans2;
// }

// function spliteDate(s) {
//    //const dateregex4 = /(วันนี้|วันพรุ่งนี้|วันมะรืน|วันที่)/g
//    let original = s.substr(0)
    

//    let resultposition  = []
//    let resultOfOriginal = []
//    const dateregexall =  [/วันจันทร์/gi,/วันอังคาร/gi,/วันพุธ/gi,/วันพฤหัส/gi,/วันศุกร์/gi,/วันเสาร์/gi,/วันอาทิตย์/gi,/วันนี้/gi,/วันพรุ่งนี้/gi,/วันมะรืน/gi,/วันที่/gi,/([1-2][0-9]|[0-9])(   |  | |)(มกรา|กุมภา|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา)/gi ]
//    s=s.replace(/\s/gi,'')    //เอาช่องว่างระหว่างคำออก 
//    dateregexall.map((v)=>{     
//       while ((match = v.exec(s)) != null) {       
//            console.log(match)   
//            resultposition.push(match.index)                      
//         }
   
//    }) 
//    dateregexall.map((v) =>{
//      while ((match2 = v.exec(original)) != null) {       
//            console.log(match2)   
//            resultOfOriginal.push(match2.index)                      
//         }
//    })
   
//    resultposition= resultposition.sort();
//    temparray = resultposition.slice() 
//    resultOfOriginal = resultOfOriginal.sort()
//    tempForOriginal = resultOfOriginal.slice()

//    console.log(temparray)
//    console.log(tempForOriginal)
//    // กำจัด index ของคำที่ เป็นประโยคเดียวกัน วันจันทร์ 17 มกราคม =>['วันจันทร์','17 มกราคม' ] เป็นประโยคเดียวกัน
//    for(let i=0;i<resultposition.length-1;i++)
//    {
//         if(resultposition[i+1]-resultposition[i]<=10) //ในกรณีของวันจันทร์ นั้น จำนวนตัวอักษร เท่ากับ 9  วันอาทิตย์ เท่ากับ 10
//         {
//            //console.log(resultposition[i+1],"++",resultposition[i])
//            var index = resultposition.indexOf(resultposition[i+1])
//            //console.log("Match position:",index)
//            temparray.splice(index,1)
//            //console.log(temparray)
//            tempForOriginal.splice(index,1)
//            //console.log(tempForOriginal)
            
//         }
//    }
//    //-------------------resultpostition=[0,18] เอาไปตัดคำ
//   //  console.log(temparray)
//   //  console.log(tempForOriginal)
     
//    answer = []
//    answerForOriginal = []
//    for(let i=0;i<temparray.length;i++) 
//    {
//      if(i==temparray.length-1)
//      {
       
//        answer.push(s.substr(temparray[i]))
//        answerForOriginal.push(original.substr(tempForOriginal[i]))
//        break;
//      }
//      //console.log(temparray[i],temparray[i+1])
//      answer.push(s.substr(temparray[i],temparray[i+1]-temparray[i]))
//      answerForOriginal.push(original.substr(tempForOriginal[i],tempForOriginal[i+1]-tempForOriginal[i]))
     
//    }
    
//   //  console.log(answer)
//   //  console.log(answerForOriginal)
//    //------------------------- 
//  return answerForOriginal
// }

// console.log(splitWordWithPlusSign(" อังคาร ไป 10 โมง  โรบินสันนะครับ   พุธ ไป พัทยา  เสาร์ วันอังคาร วันเสาร์  วันนี้ 9โมง 10 โมง อังคาร จันทร์นี้ 10 โมง 9 โมง 11:00  วันพรุ่งนี้ พรุ่งนี้ วันมะรืน  วันนี้ 5 ทุ่ม วันนี้ จะไปดูหนัง"))
// console.log(splitWordWithPlusSign(" ไปโรบินสัน 19.00 19:00"))
// console.log(splitWordWithPlusSign(" ไปโรบินสัน  "))
// console.log(splitWordWithPlusSign("วันอาทิตย์ ไปกินข้าวตอน 10.45 11 โมง 45 นาที โรบินสัน วันจันทร์ 8 โมง เรียนสัมนา ม.เกษตร ศรีราชา ไปเที่ยวทะเลพัทยา,ไหว้พระ พุทธมน 18:00"))
// console.log(splitWordWithPlusSign("วัน พุธ 8 โมง "))
// console.log(splitWordWithPlusSign("วัน พุธ 9 โมง 5 นาที "))
// console.log(splitWordWithPlusSign("วันนี้"))
// console.log(splitWordWithPlusSign("วันนี้ 9 โมง 50 นาที "))
// console.log(splitWordWithPlusSign("มะรืน "))
// console.log(splitWordWithPlusSign("มะรืน 14.25"))
// console.log(splitWordWithPlusSign("พรุ่งนี้"))
// console.log(splitWordWithPlusSign("พรุ่งนี้  13.22"))
// console.log(splitWordWithPlusSign("จันทร์ ไปโรบินสัน จัน ")) 
// console.log(splitWordWithPlusSign("จ.  "))
// console.log(splitWordWithPlusSign("อังคาร"))  //
// console.l og(splitWordWithPlusSign("อ"))
//console.log(splitWordWithPlusSign("พุทธ"))
// console.log(splitWordWithPlusSign("พุท"))
// console.log(splitWordWithPlusSign("พุทธ"))
// console.log(splitWordWithPlusSign("วันอังคาร 11.00 "))
// console.log(splitWordWithPlusSign("วันอังคาร 17.00 "))
// console.log(splitWordWithPlusSign("จ. 11.55 13.00 21.00 15.00  19.25  อ. 10.20   พุธ 14.00 วันพุธ 16.00  พ. 12.00  พฤ. 13.00  ศ. 6.30  ส. 11.50  อ. 14.23  อาทิตย์ 14.20 อังคาร 22.30 อาทิตย์ 15.00  พรุ่งนี้  มะรืน วันพรุ่งนี้ วันมะรืน"))//ไม่ใช่วันนี้เป็น 7.00 
// console.log(splitWordWithPlusSign("  ากาด่วห่กด"))
 // console.log(splitWordWithPlusSign("วันที่ 24 ไป วันจันทร์ จตุจักร  จันทร์ ไปโรบินสัน "))
//console.log(splitWordWithPlusSign("พฤษภาคม"))
// 15 เมษา ไปโร วันพรุ่งนี้ ไป พัทยา  
//console.log(splitWordWithPlusSign("วันจันทร์ ไปซื้อของ 17 มกราคม โรบินสัน พัทยา วันอังคารไปเที่ยว นะ"))
//console.log(splitWordWithPlusSign("วันจันทร์ 22.30  วันอังคาร 11.25  วันศุกร์ 13.00 วันอาทิตย์ ไปกินข้าวตอน 10.45 11 โมง 45 นาที วันเสาร์ 13.20"))
// console.log(splitWordWithPlusSign("วันจันทร์ ไปซื้อของ 17 มกราคม โรบินสัน พัทยา วันอังคารไปเที่ยว นะ จันทร์1 พฤษภา 11.00 "))
//console.log( splitWordWithPlusSign("อา. 10.25 7 โมง 50 นาที 23 นาฬิกา 9 นาที "))
//console.log(splitWordWithPlusSign("ไปเที่ยวนะ จ๊ะๆๆๆๆ  17 มกราคม  โรบินสัน พัทยา 9 โมง 11.00 ไปเที่ยว 9 โมง 5 นาที  ตี 4  บ่าย 3 บ่าย 2 35 นาที  11 นาฬิกา 25 นาที    "))
// console.log(splitWordWithPlusSign("วันจันทร์ 9 โมง"))
 // console.log(splitWordWithPlusSign(" 10.30  อีก 5 นาที อีก 1 ชั่วโมง อีก 2 สัปดาห์"))
 
//console.log( splitWordWithPlusSign("อา. 10.25 7 โมง 50 นาที 23 นาฬิกา 9 นาที "))
//console.log(splitWordWithPlusSign("ไปเที่ยวนะ จ๊ะๆๆๆๆ  17 มกราคม  โรบินสัน พัทยา 9 โมง 11.00 ไปเที่ยว 9 โมง 5 นาที  ตี 4  บ่าย 3 บ่าย 2 35 นาที  11 นาฬิกา 25 นาที    "))
// console.log(splitWordWithPlusSign("วันจันทร์ 9 โมง"))
 //console.log(splitWordWithPlusSign(" 10.30  อีก 5 นาที อีก 1 ชั่วโมง อีก 5 สัปดาห์ 5 โมง"))
 //console.log(splitWordWithPlusSign(" ไปไหนไม่รู้ ยู้วหูวว 10.25 "))
//console.log(splitWordWithPlusSign("วันจันทร์ 9 โมง บ่าย 2 ครึ่ง ตี 5 ครึ่ง  10 โมง ครึ่ง  11โมงตรง 17 นาฬิกา"))
//console.log(splitWordWithPlusSign("วันปีใหม่ 10.25 ธธารส้เหวดหก้ดก้ด้ว"))
// console.log(splitWordWithPlusSign("วันนี้ "))
//console.log(splitWordWithPlusSign("วันอาทิตย์"))

})