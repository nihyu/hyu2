/ *
京小超兑换奖品脚本地址：https：//raw.githubusercontent.com/LXK9301/jd_scripts/master/jd_blueCoin.js
感谢@yangtingxiao提供PR
更新时间：2020-12-24
支持京东多个账号
脚本兼容：QuantumultX，Surge，Loon，JSBox，Node.js
===================== quantumultx ===============
[task_local]
＃京小超兑换奖品
0 0 0 * * * https://raw.githubusercontent.com/LXK9301/jd_scripts/master/jd_blueCoin.js，tag=京小超兑换奖品，img-url = https：//raw.githubusercontent.com/58xinian/ icon / master / jxc.png，启用= true
====================月亮==================
[脚本]
cron“ 0 0 0 * * *”脚本路径= https：//raw.githubusercontent.com/LXK9301/jd_scripts/master/jd_blueCoin.js,tag=京小超兑换奖品
==================浪涌===================
京小超兑换奖品=类型= cron，cronexp =“ 0 0 0 * * *”，唤醒系统= 1，超时= 20，脚本路径= https：//raw.githubusercontent.com/LXK9301/jd_scripts/master /jd_blueCoin.js
 * /
const  $  =  new  Env （'京小超兑换奖品' ）;
const  notify  =  $ 。isNode （）？要求（'./sendNotify' ）：'' ;
//Node.js用户请在jdCookie.js处填写京东ck;
const  jdCookieNode  =  $ 。isNode （）？require （'./jdCookie.js' ）：'' ;
让 coinToBeans  =  $ 。getdata （'coinToBeans' ） ||  20 ;  //兑换多少数量的京豆（20或1000），0表示不兑换，替换兑换20京豆，如需兑换把0改成20或1000，或者'商品名称'（商品名称放到单引号内）即可
让 jdNotify  =  false ; //是否开启静默运行，否则错误关闭（即：奖品兑换成功后会发出通知提示）
// IOS等用户直接用NobyDa的jd cookie
让 cookiesArr  =  [ ] ， cookie  =  '' ;
如果 （$ 。isNode （）） {
  对象。键（jdCookieNode ）。forEach （（项目） =>  {
    cookiesArr 。推送（jdCookieNode [ item ] ）
  } ）
  如果 （过程。ENV 。JD_DEBUG  && 过程。ENV 。JD_DEBUG  ===  '假' ） 的控制台。log  =  （） =>  { } ;
} 其他 {
  让 cookiesData  =  $ 。getdata （'CookiesJD' ） ||  “ []” ;
  cookiesData  =  jsonParse （cookiesData ）;
  cookiesArr  =  cookiesData 。映射（项 => 项。饼干）;
  cookiesArr 。反向（）;
  cookiesArr 。推（ ... [ $ 。的GetData （'CookieJD2' ）， $ 。的GetData （'CookieJD' ）] ）; 
  cookiesArr 。反向（）;
  cookiesArr  =  cookiesArr 。过滤器（item  =>  item！== “”  &&  item！== null  &&  item！== undefined ）;
}

const  JD_API_HOST  =  `https：//api.m.jd.com/api？appid = jdsupermarket` ;
！（异步 （） =>  {
  如果 （！cookiesArr [ 0 ] ） {
    $ 。msg （$ 。name ， '【提示】请先获取cookie \ n直接使用NobyDa的京东签到获取' ， 'https: //bean.m.jd.com/bean/signIndex.action ' ， { “ open-url “：” https://bean.m.jd.com/bean/signIndex.action“ } ）；
    回报;
  }
  对于 （让 我 = 0 ; 我 <  cookiesArr 。长度; 我++ ） {
    cookie  =  cookiesArr [ i ] ；
    如果 （cookie ） {
      $ 。用户名 =  decodeURIComponent （饼干。匹配（/ pt_pin = （。+？） ; / ） && 饼干。匹配（/ pt_pin = （。+？） ; / ）[ 1 ] ）
      $ 。指数 =  i  +  1 ;
      $ 。数据 =  { } ;
      $ 。coincount  =  0 ;
      $ 。beanscount  =  0 ;
      $ 。blueCost  =  0 ;
      $ 。coinerr  =  “” ;
      $ 。beanerr  =  “” ;
      $ 。标题 =  '' ;
      //console.log($.coincount）;
      $ 。isLogin  =  true ;
      $ 。nickName  =  '' ;
      等待 TotalBean （）;
      控制台。日志（`\ n开始【京东账号$ { $ 。索引}】$ { $ 。昵称 ||  $ 。用户名} \ N` ）;
      控制台。log （`目前暂无兑换酒类的奖品功能，即使输入酒类名称，脚本也会提示下架\ n` ）
      如果 （！$ 。isLogin ） {
        $ 。味精（$ 。名称， `【提示】饼干已失效` ， `京东账号$ { $ 。指数}  $ { $ 。绰号 ||  $ 。用户名} \ n请重新登录获取\ nhttps：//bean.m。 jd.com / bean / signIndex.action` ， { “ open-url”：“ https://bean.m.jd.com/bean/signIndex.action” } ）；

        如果 （$ 。isNode （）） {
          等待 通知。sendNotify （` $ { $ 。名}饼干已失效- $ { $ 。用户名} ` ， `京东账号$ { $ 。指数}  $ { $ 。用户名} \ n请重新登录获取cookie` ）;
        }
        继续
      }
      //先兑换京豆
      如果 （$ 。isNode （）） {
        如果 （过程。ENV 。MARKET_COIN_TO_BEANS ） {
          coinToBeans  = 流程。ENV 。MARKET_COIN_TO_BEANS ;
        }
      }
      if  （` $ { coinToBeans } `！== '0' ） {
        等待 smtgHome （）; //查询蓝币数量，是否满足兑换的条件
        等待 PrizeIndex （）;
      } 其他 {
        控制台。log （'查询到您设置的是不兑换京豆选项，现在为您跳过兑换京豆。如需兑换，请去BoxJs设置或修改脚本coinToBeans \ n' ）
      }
      等待 msgShow （）;
    }
  }
} ）（）
  。捕捉（（ë ） =>  $ 。LOGERR （ê ））
  。最后（（） =>  $ 。完成（））
异步 函数 PrizeIndex （） {
  等待 smtg_queryPrize （）;
  // //等待smtg_materialPrizeIndex（）; //交换酒类奖品，此交换API与之前的交换京豆类的替代，故目前无法进行
  // const PrizeList = [... $。queryPrizeData，... $。materialPrizeIndex];
  const  awardList  =  [ ... $ 。queryPrizeData ] ;
  if  （` $ { coinToBeans } `  ===  '1000' ） {
    如果 （prizeList [ 1 ]  &&  prizeList [ 1 ] 。beanType  ===  'BeanPackage' ） {
      控制台。日志（`查询换$ { prizeList [ 1 ] 。标题} ID成功，ID：$ { prizeList [ 1 ] 。prizeId } ` ）
      $ 。标题 = 奖品清单[ 1 ] 。标题;
      $ 。blueCost  = 奖赏列表[ 1 ] 。blueCost ;
    } 其他 {
      控制台。日志（`查询换1000京豆ID失败` ）
      $ 。beanerr  =  `东哥今天不给换` ;
      回报 ;
    }
    如果 （prizeList [ 1 ]  &&  prizeList [ 1 ] 。的inStock  ===  506 ） {
      $ 。beanerr  =  `失败，1000京豆领光了，请明天再来` ;
      回报 ;
    }
    如果 （prizeList [ 1 ]  &&  prizeList [ 1 ] 。targetNum  ===  prizeList [ 1 ]  &&  prizeList [ 1 ] 。finishNum ） {
      $ 。beanerr  =  ` $ { PrizeList [ 1 ] 。subTitle } ` ;
      回报 ;
    }
    //兑换1000京豆
    如果 （$ 。totalBlue  >  $ 。blueCost ） {
      AWAIT  smtg_obtainPrize （prizeList [ 1 ] 。prizeId ）;
    } 其他 {
      控制台。日志（`兑换失败，您目前蓝币$ { $ 。totalBlue }个，不足以兑换$ { $ 。标题}所需的$ { $ 。blueCost }个' ）;
      $ 。beanerr  =  `兑换失败，您当前蓝币$ { $ 。totalBlue }个，不足以兑换$ { $ 。title }所需的$ { $ 。blueCost }个` ;
    }
  }  else  if  （` $ { coinToBeans } `  ===  '20' ） {
    如果 （prizeList [ 0 ]  &&  prizeList [ 0 ] 。beanType  ===  '豆' ） {
      控制台。日志（`查询换$ { prizeList [ 0 ] 。标题} ID成功，ID：$ { prizeList [ 0 ] 。prizeId } ` ）
      $ 。标题 =  PrizeList [ 0 ] 。标题;
      $ 。blueCost  = 奖赏列表[ 0 ] 。blueCost ;
    } 其他 {
      控制台。日志（`查询换万能的京豆ID失败` ）
      $ 。beanerr  =  `东哥今天不给换` ;
      回报 ;
    }
    如果 （prizeList [ 0 ]  &&  prizeList [ 0 ] 。的inStock  ===  506 ） {
      控制台。log （`失败，万能的京豆领光了，请明天再来` ）；
      $ 。beanerr  =  `失败，万能的京豆领光了，请明天再来` ;
      回报 ;
    }
    如果 （（prizeList [ 0 ]  &&  prizeList [ 0 ] 。targetNum ） ===  （prizeList [ 0 ]  &&  prizeList [ 0 ] 。finishNum ）） {
      $ 。beanerr  =  ` $ { PrizeList [ 0 ] 。subTitle } ` ;
      回报 ;
    }
    //兑换万能的京豆（1-20京豆）
    如果 （$ 。totalBlue  >  $ 。blueCost ） {
      AWAIT  smtg_obtainPrize （prizeList [ 0 ] 。prizeId ，1000 ）;
    } 其他 {
      控制台。日志（`兑换失败，您目前蓝币$ { $ 。totalBlue }个，不足以兑换$ { $ 。标题}所需的$ { $ 。blueCost }个' ）;
      $ 。beanerr  =  `兑换失败，您当前蓝币$ { $ 。totalBlue }个，不足以兑换$ { $ 。title }所需的$ { $ 。blueCost }个` ;
    }
  } 其他 {
    //自定义输入兑换
    让 prizeId  =  '' ， 我;
    对于 （让 索引 =  0 ; 索引 <  prizeList 。长度; 索引 ++ ） {
      如果 （prizeList [指数] 。标题。的indexOf （coinToBeans ） >  - 1 ） {
        PrizeId  = 奖赏列表[ index ] 。PrizeId ;
        i  = 索引;
        $ 。标题 = 奖品清单[索引] 。标题;
        $ 。blueCost  = 奖赏列表[ index ] 。blueCost ;
      }
    }
    如果 （priestId ） {
      如果 （prizeList [我] 。的inStock  ===  506  ||  prizeList [我] 。的inStock  ===  - 1 ） {
        控制台。log （`失败，您输入设置的$ { coinToBeans }领光了，请明天再来` ）;
        $ 。beanerr  =  `失败，您输入设置的$ { coinToBeans }领光了，请明天再来` ;
        回报 ;
      }
      如果 （（prizeList [我] 。targetNum ） &&  prizeList [我] 。targetNum  ===  prizeList [我] 。finishNum ） {
        $ 。beanerr  =  ` $ { PrizeList [ 0 ] 。subTitle } ` ;
        回报 ;
      }
      如果 （$ 。totalBlue  >  $ 。blueCost ） {
        等待 smtg_obtainPrize （prizeId ）;
      } 其他 {
        控制台。日志（`兑换失败，您目前蓝币$ { $ 。totalBlue }个，不足以兑换$ { $ 。标题}所需的$ { $ 。blueCost }个' ）;
        $ 。beanerr  =  `兑换失败，您当前蓝币$ { $ 。totalBlue }个，不足以兑换$ { $ 。title }所需的$ { $ 。blueCost }个` ;
      }
    } 其他 {
      控制台。log （`奖品兑换清单[ $ { coinToBeans } ]已下架，请检查APP是否存在此商品，如存在请检查您的输入是否正确` ）；
      $ 。beanerr  =  `奖品兑换列表[ $ { coinToBeans } ]已下架` ;
    }
  }
}
//查询白酒类奖品列表API
函数 smtg_materialPrizeIndex （超时=  0 ） {
  返回 新的 Promise （（resolve ） =>  {
    setTimeout （ （）=> {
      让 url  =  {
        网址：` $ { JD_API_HOST }＆functionId = smtg_materialPrizeIndex＆clientVersion = 8.0.0＆client = m＆body =％7B％22channel％22：％221％22％7D＆t = $ {日期。现在（）} ` ，
        标头：{
          'Origin'：`https：// jdsupermarket.jd.com` ，
          “ Cookie”：cookie ，
          '连接'：`保持活动` ，
          'Accept'：`application / json，text / plain，* / *` ，
          'Referer'：`https：//jdsupermarket.jd.com/game/？tt = 1597540727225` ，
          '主机'：`api.m.jd.com` ，
          'Accept-Encoding'：`gzip，deflate，br` ，
          'Accept-Language'：`zh-cn`
        }
      }
      $ 。post （url ， async  （err ， resp ， data ） =>  {
        尝试 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            如果 （数据。数据。bizCode！== 0 ） {
              $ 。beanerr  =  ` $ {数据。数据。bizMsg } ` ;
              返回
            }
            $ 。materialPrizeIndex  = 数据。数据。结果。奖品 ||  [ ] ;
          }
        } 抓住 （e ） {
          $ 。logErr （e ， resp ）;
        } 最后 {
          解决（）
        }
      } ）
    } ，超时）
  } ）
}
//查询任务
函数 smtg_queryPrize （超时=  0 ）{
  返回 新的 Promise （（resolve ） =>  {
    setTimeout （ （）=> {
      让 url  =  {
        网址：` $ { JD_API_HOST }＆functionId = smtg_queryPrize＆clientVersion = 8.0.0＆client = m＆body =％7B％7D＆t = $ { Date 。现在（）} ` ，
        标头：{
          'Origin'：`https：// jdsupermarket.jd.com` ，
          “ Cookie”：cookie ，
          '连接'：`保持活动` ，
          'Accept'：`application / json，text / plain，* / *` ，
          'Referer'：`https：//jdsupermarket.jd.com/game/？tt = 1597540727225` ，
          '主机'：`api.m.jd.com` ，
          'Accept-Encoding'：`gzip，deflate，br` ，
          'Accept-Language'：`zh-cn`
        }
      }
      $ 。post （url ， async  （err ， resp ， data ） =>  {
        尝试 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            $ 。queryPrizeData  = 数据；
            如果 （数据。数据。bizCode！== 0 ） {
              $ 。beanerr  =  ` $ {数据。数据。bizMsg } ` ;
              返回
            }
            如果 （数据。数据。bizCode  ===  0 ） {
              const  { PrizeList }  = 数据。数据。结果;
              $ 。queryPrizeData  =  data 。数据。结果。奖品列表 ||  [ ] ;
            }
          }
        } 抓住 （e ） {
          $ 。logErr （e ， resp ）;
        } 最后 {
          解决（）
        }
      } ）
    } ，超时）
  } ）
}
//换京豆
函数 smtg_obtainPrize （prizeId ，超时=  0 ） {
  // 1000京豆，prizeId为4401379726
  返回 新的 Promise （（resolve ） =>  {
    setTimeout （ （）=> {
      让 url  =  {
        网址：` $ { JD_API_HOST }＆functionId = smtg_obtainPrize＆clientVersion = 8.0.0＆client = m＆body =％7B％22prizeId％22：％22 $ { PrizeId }％22％7D＆t = $ { Date 。现在（）} ` ，
        标头：{
          'Origin'：`https：// jdsupermarket.jd.com` ，
          “ Cookie”：cookie ，
          '连接'：`保持活动` ，
          'Accept'：`application / json，text / plain，* / *` ，
          'Referer'：`https：//jdsupermarket.jd.com/game/？tt = 1597540727225` ，
          '主机'：`api.m.jd.com` ，
          'Accept-Encoding'：`gzip，deflate，br` ，
          'Accept-Language'：`zh-cn`
        }
      }
      $ 。post （url ， async  （err ， resp ， data ） =>  {
        尝试 {
          控制台。log （`兑换结果：$ { data } ` ）;
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            $ 。数据 = 数据;
            如果 （$ 。数据。数据。bizCode！== 0 ） {
              $ 。beanerr  =  ` $ { $ 。数据。数据。bizMsg } ` ;
              //console.log（`【京东账号$ {$。index}] $ {$。nickName}换取京豆失败：$ {$。data.data.bizMsg}`）
              返回
            }
            如果 （$ 。数据。数据。bizCode  ===  0 ） {
              if  （` $ { coinToBeans } `  ===  '1000' ） {
                $ 。beanscount  ++ ;
                控制台。日志（`【京东账号$ { $ 。指数}】$ { $ 。昵称}第$ { $ 。数据。数据。结果。exchangeNum }次换$ { $ 。标题}成功` ）
                if  （$ 。beanscount  ===  1 ） 返回;
              }  else  if  （` $ { coinToBeans } `  ===  '20' ） {
                $ 。beanscount  ++ ;
                控制台。日志（`【京东账号$ { $ 。指数}】$ { $ 。昵称}第$ { $ 。数据。数据。结果。exchangeNum }次换$ { $ 。标题}成功` ）
                如果 （$ 。数据。数据。结果。exchangeNum  ===  20  ||  $ 。beanscount  ===  coinToBeans  ||  $ 。数据。数据。结果。蓝色 <  500 ） 返回;
              } 其他 {
                $ 。beanscount  ++ ;
                控制台。日志（`【京东账号$ { $ 。指数}】$ { $ 。昵称}第$ { $ 。数据。数据。结果。exchangeNum }次换$ { $ 。标题}成功` ）
                if  （$ 。beanscount  ===  1 ） 返回;
              }
            }
          }
          等待  smtg_obtainPrize （awardId ，3000 ）;
        } 抓住 （e ） {
          $ 。logErr （e ， resp ）;
        } 最后 {
          解决（）
        }
      } ）
    } ，超时）
  } ）
}
函数 smtgHome （） {
  返回 新的 Promise （（resolve ） =>  {
    $ 。get （taskUrl （'smtg_home' ）， （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。log （'\ n京小超兑换奖品：API查询请求失败！️！️' ）
          控制台。日志（JSON 。字符串化（ERR ））;
        } 其他 {
          如果 （safeGet （数据）） {
            data  =  JSON 。解析（数据）;
            如果 （数据。数据。bizCode  ===  0 ） {
              const  {结果}  = 数据。数据;
              $ 。totalGold  = 结果。totalGold ;
              $ 。totalBlue  = 结果。totalBlue ;
              控制台。日志（`【总金币】$ { $ 。totalGold }个\ N` ）;
              控制台。日志（`【总蓝币】$ { $ 。totalBlue }个\ N` ）;
            }
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）;
      } 最后 {
        解决（）;
      }
    } ）
  } ）
}

//通知
功能 msgShow （） {
  // $ .msg（$。name，``，`【京东账号$ {$。index}] $ {$。nickName} \ n【包含蓝币】$ {$。coincount？`$ {$。coincount}个`：$ .coinerr} $ {coinToBeans？`\ n【兑换京豆】$ {$ .beanscount？`$ {$。beanscount}个`：$ .beanerr}`：“”}`）;
  返回 新的 Promise （异步 resolve  =>  {
    $ 。日志（`\ n【京东账号$ { $ 。指数}】$ { $ 。昵称} \ n $ { coinToBeans？`【兑换$ { $ 。标题}】$ { $ 。beanscount？`成功`：$ 。beanerr } `：“您设置的是不兑换奖品” } \ n` ）;
    让 ctrTemp ;
    如果 （$ 。isNode （） && 过程。ENV 。MARKET_REWARD_NOTIFY ） {
      ctrTemp  =  ` $ {进程。ENV 。MARKET_REWARD_NOTIFY } `  ===  'false' ;
    }  else  if  （$ 。getdata （'jdSuperMarketRewardNotify' ）） {
      ctrTemp  =  $ 。getdata （'jdSuperMarketRewardNotify' ） ===  'false' ;
    } 其他 {
      ctrTemp  =  ` $ { jdNotify } `  ===  'false' ;
    }
    //情况只在兑换奖品成功后弹窗提醒。情况加，只打印日志，不弹窗
    如果 （$ 。beanscount  &&  ctrTemp ） {
      $ 。味精（$ 。名称， `` ， `【京东账号$ { $ 。指数}】$ { $ 。昵称} \ n $ { coinToBeans？`【兑换$ { $ 。标题}】$ {  $ 。beanscount？`成功，数量：$ { $ 。beanscount }个`：$ 。beanerr } `：“您设置的是不兑换奖品” } `）;
      如果 （$ 。isNode （）） {
        等待 通知。sendNotify （` $ { $ 。名称} -账号$ { $ 。指数} - $ { $ 。昵称} ` ， `【京东账号$ { $ 。指数}】$ { $ 。用户名} \ n $ { coinToBeans？` 【兑换$ { $ 。标题}】$ { $ 。beanscount？`成功，数量：$ {$ 。beanscount }个`： $ 。beanerr } `：“您设置的是不兑换奖品”}`）
      }
    }
    解决（）
  } ）
}
函数 TotalBean （） {
  返回 新的 Promise （异步 resolve  =>  {
    const  options  =  {
      “ url”：`https：//wq.jd.com/user/info/QueryJDUserInfo？sceneval = 2` ，
      “标题”：{
        “ Accept”：“ application / json，text / plain，* / *” ，
        “ Content-Type”：“ application / x-www-form-urlencoded” ，
        “ Accept-Encoding”：“ gzip，deflate，br” ，
        “ Accept-Language”：“ zh-cn” ，
        “连接”：“保持活动” ，
        “ Cookie”：cookie ，
        “ Referer”：“ https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2” ，
        “用户代理”：$ 。isNode （）？（过程。ENV 。JD_USER_AGENT？过程。ENV 。JD_USER_AGENT：（要求（'./USER_AGENTS' ）。 USER_AGENT ））：（$ 。的GetData （'JDUA' ）？ $ 。的GetData （'JDUA' ）： “jdapp; iPhone ; 9.2.2; 14.2;％E4％BA％AC％E4％B8％9C / 9.2.2 CFNetwork / 1206 Darwin / 20.1.0“）
      }
    }
    $ 。post （options ， （err ， resp ， data ） =>  {
      尝试 {
        如果 （err ） {
          控制台。日志（` $ { JSON 。字符串化（ERR ）} ` ）
          控制台。日志（` $ { $ 。名} API请求失败，请检查网路重试` ）
        } 其他 {
          如果 （数据） {
            data  =  JSON 。解析（数据）;
            if  （data [ 'retcode' ]  ===  13 ） {
              $ 。isLogin  =  false ;  // cookie过期
              返回
            }
            $ 。nickName  =  data [ 'base' ] 。昵称;
          } 其他 {
            控制台。日志（`京东服务器返回空数据` ）
          }
        }
      } 抓住 （e ） {
        $ 。logErr （e ， resp ）
      } 最后 {
        解决（）;
      }
    } ）
  } ）
}
函数 safeGet （数据） {
  尝试 {
    如果 （typeof运算 JSON 。解析（数据） ==  “对象” ） {
      返回 true ;
    }
  } 抓住 （e ） {
    控制台。log （e ）;
    控制台。日志（`京东服务器访问数据为空，请检查自身设备网络情况` ）；
    返回 false ;
  }
}
函数 taskUrl （function_id ， body =  { } ） {
  返回 {
    网址：` $ { JD_API_HOST }＆functionId = $ { function_id }＆客户机版本8.0.0 =＆客户= M＆体= $ {逃逸（JSON 。字符串化（本体））}＆T = $ {日期。现在（）} ` ，
    标头：{
      “用户代理”：$ 。isNode （）？（过程。ENV 。JD_USER_AGENT？过程。ENV 。JD_USER_AGENT：（要求（'./USER_AGENTS' ）。 USER_AGENT ））：（$ 。的GetData （'JDUA' ）？ $ 。的GetData （'JDUA' ）： “jdapp; iPhone ; 9.2.2; 14.2;％E4％BA％AC％E4％B8％9C / 9.2.2 CFNetwork / 1206 Darwin / 20.1.0“），
      '主机'：'api.m.jd.com' ，
      “ Cookie”：cookie ，
      '推荐人'：'https : //jdsupermarket.jd.com/game ' ，
      '来源'：'https : //jdsupermarket.jd.com' ，
    }
  }
}
函数 jsonParse （str ） {
  如果 （typeof  str  ==  “ string” ） {
    尝试 {
      返回 JSON 。解析（str ）;
    } 抓住 （e ） {
      控制台。log （e ）;
      $ 。msg （$ 。name ， `` ， '不要随意在BoxJs输入框修改内容\ n建议通过脚本去获取cookie' ）
      返回 [ ] ;
    }
  }
}
函数 Env （t ，s ）{返回 新 类{构造函数（t ，s ）{ this 。名字= t ，这个。数据= null ，这。dataFile = “ box.dat” ，这个。原木= [ ] ，这个。logSeparator = “ \ n” ，这个。startTime =（新 日期）。getTime （），对象。分配（此，š ），此。日志（“” ，`\ ud83d \ udd14 $ {这个。名字}，\ u5f00 \ u59cb！' ）} isNode （）{返回“未定义”！= typeof运算 模块&& !! 模块。出口} isQuanX （）{返回“ undefined”！= typeof  $ task } isSurge （）{返回“ undefined”！= typeof  $ httpClient && “ undefined” == typeof  $ loon } isLoon （）{返回“ undefined”！= typeof  $ loon } getScript （t ）{返回 新的 承诺（小号=> { $ 。获得（{网址：牛逼} ，（吨，ê ，我）=>小号（我））} ）}的runScript （吨，š ）{返回 新 无极（é => {让 我=此。的GetData （“@ chavy_boxjs_userCfgs.httpapi” ）;我= i？i 。替换（/ \ n / g ，“” ）。修剪（）：i ; 让 o =这个。getdata （“ @ chavy_boxjs_userCfgs.httpapi_timeout” ）；o = o？1 * o：20 ，o = s && s 。超时？s 。超时：o ; const [ h ，a ] = i 。分割（“ @” ），r= { url：`http：// $ { a } / v1 / scripting / evaluate` ，正文：{ script_text：t ，mock_type：“ cron” ，超时：o } ，标题：{ “ X-Key”：h ，接受：“ * / *” } } ; $ 。post （r ，（t ，s ，i ）=> e （我））} ）。捕捉（吨=>此。LOGERR （吨））} loaddata （）{如果（！此。isNode （））返回{ } ; {这个。fs = this 。fs？这个。fs：require （“ fs” ），这个。路径=这个。路径？这个。路径：require （“ path” ）; const  t = this 。路径。解决（此。数据文件），š =此。路径。解决（过程。CWD （），此。数据文件），ê =此。fs 。existSync （t ），我=！e && this 。fs 。existSync （s ）; 如果（！e &&！i ）返回{ } ; { const  i = e？t：s ; 试试{返回 JSON 。解析（此。FS 。readFileSync （我））}赶上（吨）{返回{ } } } } }写数据（）{如果（此。isNode （））{此。fs = this 。fs？这个。fs：require （“ fs” ），这个。路径=这个。路径？这个。路径：要求（“路径”）; const  t = this 。路径。解决（此。数据文件），š =此。路径。解决（过程。CWD （），此。数据文件），ê =此。fs 。existSync （t ），我=！e && this 。fs 。existSync （s ），o = JSON 。字符串化（此。数据）; e？这个。fs 。writeFileSync （t ，o ）：我？这个。fs 。writeFileSync （s ，o ）：这个。fs 。writeFileSync （t ，o ）} } lodash_get（t ，s ，e ）{ const  i = s 。替换（/ \ [ （\ d + ）\] / g ，“。$ 1” ）。split （“。” ）; 令 o = t ; for （const  t  of  i ）if （o = Object （o ）[ t ] ，void  0=== o ）返回 e ; 返回 o } lodash_set （t ，s ，e ）{返回 Object （t ）！== t？吨：（阵列。IsArray的（小号）|| （小号=小号。的toString （）。匹配（/ [ ^ [ \] ] + /克）|| [] ），š 。切片（0 ，- 1 ）。减少（（吨，ê ，我）=>对象（吨[ ë ] ）===吨[ ë ]？吨[ ë ]：吨[ ë ] =数学。ABS （小号[我+ 1 ] ）>> 0== + s [ i + 1 ]？[ ]：{ } ，t ）[ s [ s 。长度- 1 ] ] = ë ，吨）}的GetData （吨）{让 小号=此。getval （t ）; 如果（/ ^ @ / 。试验（吨））{ const [ ，e ，i ] = / ^ @ （。*？）\。（。*？）$ / 。exec （t ），o = e？这个。getval （e ）：“” ; 如果（o ）尝试{ const  t = JSON 。解析（o ）; 小号=牛逼？这个。lodash_get （t ，i ，“” ）：s } catch （t ）{ s = “” } }} return  s } setdata （t ，s ）{让 e =！1 ; 如果（/ ^ @ / 。试验（小号））{常量[，i ，o ] = / ^ @ （。*？）\。（。*？）$ / 。EXEC （小号），ħ =此。getval （i ），一个= i？“ null” === h？null：h || “ {}”：“ {}” ; 尝试{ const  s =JSON 。解析（a ）; 这个。lodash_set （s ，o ，t ），e =此。SETVAL （JSON 。字符串化（小号），我）}捕获（小号）{常量 ħ = { } ; 这个。lodash_set （h ，o ，t ），e=这个。SETVAL （JSON 。字符串化（ħ ），我）} }否则 Ë = $ 。setval （t ，s ）; 返回 e } getval （t ）{返回 这个。isSurge （）|| 这个。isLoon （）？$ persistentStore 。读（t ）：这个。isQuanX （）？$ prefs 。valueForKey （t ）：这个。isNode （）？（此。数据=此。loaddata （），此。数据[吨] ）：此。数据&&此。数据[ t ] || 空} SETVAL （吨，s ）{返回 这个。isSurge （）|| 这个。isLoon （）？$ persistentStore 。写（t ，s ）：这个。isQuanX （）？$ prefs 。setValueForKey （t ，s ）：这个。isNode （）？（此。数据=此。loaddata（），此。数据[ s ] = t ，这个。写数据（），！0 ）：这个。数据&&此。数据[ s ] || null } initGotEnv （t ）{此。得到=这个。得到了？这个。得到了：require （“ got” ），这个。cktough =这个。cktough？这个。cktough：要求（“强硬曲奇” ），本。ckjar = this 。ckjar？这个。ckjar：新 本。cktough 。CookieJar ，吨&& （吨。标题=吨。标题？吨。标题：{} ，无效 0 === t 。标头。Cookie && void  0 === t 。cookieJar && （吨。cookieJar =此。ckjar ））} GET （吨，小号= （（）=> { } ））{吨。头&& （删除 牛逼。标题[ “内容类型”] ，删除 t 。头[ “内容长度” ] ），该。isSurge （）|| 这个。isLoon （）？$ httpClient 。得到（吨，（吨，ê ，我）=> {！吨&& ë && （Ë 。体=我，ê 。的StatusCode = Ë 。状态），s （t ，e ，i ）} ）：这个。isQuanX （）？$ task 。取（t ）。然后（t => { const { statusCode：e ，statusCode：i ，headers：o ，body：h } = t ; s （null ，{ status：e ，statusCode：i ，headers：o ，body：h } ，h ）} ，t => s （t ））：这个。isNode （）&& （此。initGotEnv （牛逼），这个。有（牛逼）。在（“重定向” ，（ŧ，s ）=> {试试{ const  e = t 。标头[ “ set-cookie” ] 。映射（此。cktough 。曲奇。解析）。toString （）; 这个。ckjar 。setCookieSync （e ，null ），s 。cookieJar = this 。ckjar }捕获（吨）{这个。logErr （t ）} } ）。然后（吨=> {常量{的StatusCode：ê ，的StatusCode：我，标题：Ó ，体：ħ } =吨;小号（空，{状态：ê ，的StatusCode：我，标题：Õ ，体：h } ，h ）} ，t => s （t ）））} post （t ， s = （（）=> { } ）））{ if （t 。正文&& t 。标头&&！t 。标头[ “内容类型” ] && （吨。标题[ ‘内容类型’ ]= “ application / x-www-form-urlencoded” ），删除 t 。标头[ “ Content-Length” ] ，此。isSurge （）|| 这个。isLoon （））$ httpClient 。交（吨，（吨，ê ，我）=> {！吨&& ë && （Ë 。体=我，È 。statusCode = e 。状态），s （t ，e ，i ）} ）; 否则 ，如果（这个。isQuanX （））牛逼。方法= “ POST” ，$ task 。取（t ）。然后（t => { const { statusCode：e ，statusCode：i ，标头：o ，正文：h } = t ; s （null ，{ status：e ，statusCode：i ，headers：o ，body：h } ，h ）} ，t => s （t ））; 否则 ，如果（这个。isNode （））{这个。initGotEnv （t ）; const { url：e ， ... i } = t ; 这个。得到了。发表（e ，i ）。然后（t => { const { statusCode：e ，statusCode：i ，headers：o ，body：h } = t ; s （空，{状态：ê ，的StatusCode：我，标题：Ó ，体：ħ } ，ħ ）} ，吨=>小号（吨））} }时间（吨）{设 小号= { “M +” ：（新 日期）。getMonth （）+ 1 ，“ d +”：（新 日期）。GETDATE （），“H +” ：（新 日期）。调用getHours （），“M +” ：（新 日期）。getMinutes （），“S +” ：（新 日期）。getSeconds （），“ q +”：数学。地板（（（新的 日期）。得到月（）+ 3 ） / 3 ），小号：（新 的日期）。getMilliseconds （）} ；/ （ y + ） / 。测试（吨）&& （吨=吨。代替（正则表达式。$ 1 ，（（新 日期）。和getFullYear （）+ “” ）。SUBSTR （4 -正则表达式。$ 1 。长度）））; 为（让 e  in  s ）新 RegExp （“（” + e + “）” ）。测试（吨）&& （吨=吨。代替（正则表达式。$ 1 ，1 ==正则表达式。$ 1 。长度？小号[ ë]：（“00” +小号[ ë ] ）。substr （（“” + s [ e ] ）。length ））））；返回 t } msg （ s = t ， e = “” ， i = “” ，o ）{ const  h = t =>！t || ！这个。isLoon （）&&此。isSurge （）？t：“ string” == typeof  t？这个。isLoon （）？t：这个。isQuanX （）？{ “ open-url”：t }：void  0：“ object” == typeof  t && （t [ “ open-url” ] || t [ “ media-url”] ）？这个。isLoon （）？t [ “ open-url” ]：这个。isQuanX （）？t：无效 0：无效 0 ; 这个。isSurge （）|| 这个。isLoon （）？$ notification 。发表（s ，e ，i ，h （o ））：这个。isQuanX （）&& $ notify （s ，e ，i ，h （o ）），这个。日志。推（“” ，“ ============== \ ud83d \ udce3 \ u7cfb \ u7edf \ u901a \ u77e5 \ ud83d \ udce3 ============== “ ），本。日志。推（s ），e && this 。日志。推（É ），我&&这个。日志。推（i ）}日志（ ... t ）{ t 。长度> 0？这个。日志= [ ...此。日志， ... t ]：控制台。日志（此。日志。加入（此。logSeparator ））} LOGERR （牛逼，s ）{ const  e =！这个。isSurge （）&&！这个。isQuanX （）&&！这个。isLoon （）; e？$ 。日志（“” ，'\ u2757 \ ufe0f $ {这个。名字}，\ u9519 \ u8bef`！ ，牛逼。栈）：$ 。日志（“” ，`\ u2757 \ ufe0f$ { this 。名称}，\ u9519 \ u8bef！`，t）}wait（t）{返回 新的 Promise（s=>setTimeout（s，t））}完成（t={}）{const s=（new Date）。getTime（），e=（s-this。startTime ） / 1e3 ; 这个。日志（“” ，`\ ud83d \ udd14 $ {这个。名字}，\ u7ed3 \ u675f！\ ud83d \ udd5b $ { É } \ u79d2` ），这个。日志（），（此。isSurge （）||此。isQuanX （）||此。isLoon （））&& $完成（ŧ）} } （t ，s ）}
