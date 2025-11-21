window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// console.log(
//   '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
//   'color:orangered;font-weight:bolder'
// )

// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
/**
萤火系统桌面版，更新到8.0，首页添加各地招生政策汇总、院校招生章程、豆包智能助手，
修复不能上下拖动排序问题，
修复浮动错位问题，体检受限代码专业；
紧急修复首页不对的问题；
添加风险样色图例，
新增高报知识快答助手。
新增专业备注关键词 自动输入功能。
*/

// 参数设置中的"maximized": false 设置true 启动时会闪屏 AIIRIS

// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const { WebviewWindow } = window.__TAURI__.webviewWindow



const winOpen = (menuUrl, title, lable) => {


  const webview = new WebviewWindow(lable, {
    url: menuUrl,
    x: 500,
    y: 500,
    width: 800,
    height: 600,
    focus: true,
    title: title,
    alwaysOnTop: false,
    center: true,
    resizable: true,
    transparent: false,
    visible: true,
  })
  webview.once('tauri://created', function (e) {
    e.setIcon('');
    // webview successfully created
    console.log('new webview created')
  })
  webview.once('tauri://error', function (e) {
    // an error happened creating the webview
    console.log('new webview error', e)
  })
}



//* 注入样式表 */
window.addEventListener('load', function () {
  const bodyCss = document.createElement('style')
  bodyCss.textContent = `
      /* .staging-main>.left-box{width:200px !important;}
      .staging-main>.right-box{margin-left: 200px !important;} */
      .ad-box{display: none !important;}
      .staging-main>.right-box>.content-box{padding: 0 10px;}
      .staging-main>.right-box>.content-box>.staging-box{width:100% !important;}
      .staging-box .staging-top .left-box,.staging-box .staging-bottom .left-box{width: auto !important;flex-grow: 1;}
      #app .student-detail-wrap{width:-webkit-fill-available !important;} /* 学生个人资料 */
      #app .student-grades-main{width:-webkit-fill-available !important;} /* 学生成绩 */
      #app .intention-main{width:-webkit-fill-available !important;} /* 学生意向 */
      #app .student-blacklist-main{width:webkit-fill-available!important;} /* 意向黑名单 */
      #app .evaluation-report-main{width:-webkit-fill-available!important;} /* 学生测评结果 */
      #app .admission-track-main{width:-webkit-fill-available !important;} /* 录取跟踪 */
      .alternative-box>span,.volunteer-screening>span{font-weight: unset !important;}/* 人工筛选 备选库 左右边 */
      .alternative-box .name{color: #fff431 !important;}/* 备选库 学生姓名 */

      .exam-table .exam-checkbox .checkbox-img{cursor: pointer;} /* 选择框 鼠标样式 */
      .exam-table>.header>.exam-checkbox{width: fit-content !important;flex-direction: row !important;align-items: flex-end !important;justify-content: flex-start !important;cursor: pointer;} /* 方案全选 选择框 */
      .exam-table>.content>.row>.school-row>.exam-checkbox,.exam-table .pro-row>.exam-checkbox{width: fit-content !important;flex-direction: row-reverse !important;align-items: center !important;justify-content: space-around !important;gap: 0px 8px !important;flex-wrap: nowrap !important;} /* 方案列表 选择框 */

      #examTable thead > tr > th .exam-checkbox{flex-wrap: wrap;}/* 方案全选 选择框 */
      #examTable thead > tr > th .exam-checkbox>img{margin: 0 auto;}/* 方案全选  图片 */

      #app>.layout-main-container>.layout-main-content>.container{height:100% !important;}

      .plan-num-diff .num{display: inline-block !important;margin-left: 10px;border-width: 2px ;border-style: solid;border-radius: 5px;min-width: 30px !important;text-align: center;display: inline-block;padding: 0 2px;}
      .plan-num-diff .tag{display:none !important;}

     .main-box{height:calc(100% - 47px) !important;}
     .main-box .content .exam-box{max-width: calc(100% - 720px - 10px);}
     .min-box{height: calc(100% - 63px) !important;}
     .main-box .table-box .el-table .el-table__expanded-cell{padding-left: 10px !important;border-left: 3px #00a6f9 solid;}
     .exam-operation {transform: rotate(90deg);}
     .dilog-schoolsearch {overflow: hidden !important;}
     .datacenter-modal-container .datacenter-modal-layer{height: calc(100% - 140px) !important;}
     .datacenter-modal-layer .datacenter-modal-content {height: calc(100% - 50px) !important;}
     .datacenter-modal-layer .datacenter-modal-content iframe{height: calc(100% - 0px) !important;}
     #colorLegends{flex-grow: 1;text-align: right;display: inline-flex;justify-content: flex-end;align-items: center;text-wrap: nowrap;}
     #colorLegends>span{padding: 0;width: 15px;height: 15px;display: inline-block;border-radius: 100%;margin-left: 10px;}
     @keyframes border-flicker {0% { border-color: #f56c6c; } 50% { border-color: #f56c6c59; } 100% { border-color: #f56c6c; }}
     // #userDetail>div.header>div.tools>div.select-box>div>div>input{font-weight: bolder;color: #f56c6c;font-size: 14px;border: 2px solid #f56c6c;animation: border-flicker 1.5s infinite;}
     .fillMethod{border: none !important;}
     .fillMethod input,#userDetail > div.header > div.menu > div.select-box.fillMethod > div > div.el-input.el-input--suffix > input{font-weight: bolder;color: #f56c6c;font-size: 14px;border: 2px solid #f56c6c;animation: border-flicker 1.5s infinite;}
   `
  document.body.appendChild(bodyCss)

  if (document.querySelector('.login-main-container')) {
    document.querySelector('.login-main-container').style.height = '100%'
  }

  //左侧工具栏添加常用工具
  const appendMenu = (menuId,menuIcon, menuTitle, menuUrl) => {
    let mm = document.createRange().createContextualFragment(
      `
    <div id="` +
      menuId +
      `" class="sub-menu-box">
      <div  class="sub-menu-item" style="padding-left: 35px; ">
        <div style="text-decoration: none;font-size: 12px;cursor: pointer;line-height:26px;margin: 20px 0;">
          ` +menuIcon+menuTitle +
      `
        </div>
      </div>
    </div>
  `
    )

    let menuBox = document.querySelector('.menu-box')
    if (menuBox && !menuBox.querySelector('#' + menuId)) {
      menuBox.appendChild(mm)
    }
    mm = document.querySelector('#' + menuId)
    let _width = 800
    let _height = 600
    let _left = screen.width / 2 - _width / 2
    let _top = screen.height / 2 - _height / 2
    let features =
      `width=` +
      _width +
      `,height=` +
      _height +
      `,top=` +
      _top +
      `,left=` +
      _left +
      `,location=no,toolbar=no,menubar=no`
    if (mm) {
      mm.addEventListener('click', () => {
        // window.open(menuUrl, '_blank', features)
        winOpen(menuUrl, menuTitle, menuId)
      })
    }
  }

  // 各省招生政策
  appendMenu(
    'zc',
    '🎯',
    '各省招生政策汇总',
    'https://gaokao.chsi.com.cn/z/gkbmfslq/zszc.jsp'
  )
  // 各院校章程
  appendMenu(
    'jz',
    '👑',
    '各校招生章程汇总',
    'https://gaokao.chsi.com.cn/zsgs/zhangcheng/'
  )
  // 各院校章程
  appendMenu(
    'doubao',
    '🧑‍🏫',
    '豆包智能高报专家',
    'https://www.doubao.com/bot/Wto8nNNg'
  )
  // 高报快答
  appendMenu('reply',  '🧑‍💻','高报知识快答助手', 'https://doubao.com/bot/XXIJp72c')
  // 体检受限代码专业
  appendMenu(
    'limit',
    '👩‍⚕️',
    '体检受限代码专业',
    'https://mp.weixin.qq.com/s/JBsNpw1F6RMoS_ciEJRccA'
  )
  // 最新版本
  appendMenu('download', '☘️','检查下载最新版本', 'https://pan.baidu.com/s/1TSkbg8atgHJjQtbjMUvmww?pwd=g75g')

  // 录取日程
  appendMenu('schedule', '📆','录取日程结果查询', 'https://gaokao.chsi.com.cn/z/gkbmfslq/lqjg.jsp')

  // 特殊类型招生
  appendMenu('tszs', '🌞','阳光高考特殊招生', ' https://gaokao.chsi.com.cn/gkzt/tszs')



  // 清除缓存
  let reloadBtn = document.createRange().createContextualFragment(`
    <div id="reloadBar" style="flex-grow: 1;">
          <div id="reloadBtn" style="font-size: 15px;cursor: pointer;font-weight: bolder;width: fit-content;display: inline-flex;">
          <span style="filter: hue-rotate(160deg);">🔄</span><span style="color: #fe8964;font-weight: bolder;text-wrap-mode: nowrap;" title="Win：Ctrl+F5；Mac：Command+Shift+R">强制刷新(Ctrl+F5)</span>
          </div>
    </div>
  `)
  let navLeft =
    document.querySelector('.nav-left') || document.querySelector('.left-opera')
  console.log(navLeft)
  const clearCache = () => {
    // 清除本地存储
    localStorage.clear()
    // 清除会话存储
    sessionStorage.clear()
    // 清除浏览器缓存
    window.location.reload(true)

    // window.location.replace(window.location.href);
    const home =
      'https://aiirs.qingtingzy.net/irs_vue_dist/irs_index.html#/staging'
    if (location.href != home) {
      // location.replace(home);
    }
  }
  if (navLeft && !document.querySelector('#reloadBtn')) {
    navLeft.after(reloadBtn)
  }
  reloadBtn = document.querySelector('#reloadBtn')
  if (reloadBtn) {
    reloadBtn.addEventListener('click', () => {
      clearCache()
    })
  }

  let Q4 = document.querySelector('#queryId4')
  if (Q4) {
    Q4.style.display = ''
  }
  let Q2 = document.querySelector('#queryId2')
  if (Q2) {
    Q2.style.display = ''
  }
  let Q3 = document.querySelector('#queryId3')
  if (Q3) {
    Q3.style.display = ''
    Q3.querySelectorAll('li').forEach(li => {
      li.style.display = ''
    })
  }

  const observer = new MutationObserver(function (mutations, observer) {
    fixCheckAll();
    fixEls();
  })

  const body = document.querySelector('body')
  const config = {
    attributes: true,
    attributeFilter: ['fixed'],
    childList: true,
    subtree: true
  }
  observer.observe(body, config)

  /* 全选框加全选提示 */
  const fixCheckAll = () => {
    let chkAllBox = document.querySelector('.exam-table>.header>.exam-checkbox') || document.querySelector("#examTable thead > tr > th .exam-checkbox");
    console.log(chkAllBox);
    if (chkAllBox && !chkAllBox.innerText.includes('全选')) {
      chkAllBox.append('全选');
    }
  }


  /* 处理el层错位问题 Start*/
  const zoomScale = 0.85
  let fixed = []
  document.body.style.zoom = zoomScale
  const releaseEl = () => {
    fixed.forEach((el, index) => {
      if (el.style.display != '') {
        fixed.splice(index, 1)
      }
    })
  }
  document.addEventListener('mousemove', releaseEl, false)
  document.addEventListener('mousedown', releaseEl, false)

  // 动态修复ElementPlus位置偏移问题
  const fixEls = () => {
    let els = document.querySelectorAll(
      'body>.el-popper,body>.el-tooltip__popper,body>.layui-layer-tips'
    )
    if (els) {
      els.forEach(el => {
        // el.style.scale=zoomScale;
        if (el.style.display == '') {
          if (!fixed.includes(el)) {
            let offSetTop = 0
            if (
              el.classList.contains('el-tooltip__popper') ||
              el.classList.contains('layui-layer-tips')
            ) {
              offSetTop = 15
            }
            let offSetLeft = 0
            if (el.classList.contains('el-tooltip__popper')) {
              offSetLeft = 15
            } else if (el.classList.contains('layui-layer-tips')) {
              offSetLeft = 5
            }
            setTimeout(() => {
              el.style.top =
                parseInt(el.style.top) * (1 / zoomScale) + offSetTop + 'px'
              el.style.left =
                parseInt(el.style.left) * (1 / zoomScale) + offSetLeft + 'px'
              fixed.push(el)
              console.log('fixed')
            }, 0)
          }
        }
      })
    }
  }
  /* 处理el层错位问题 end*/

  /* 处理学费区间 Start*/
  const formateTuition = t => {
    return t < 10000
      ? ((t * 1.0) / 1000).toFixed(2) + ' <span>千</span>元'
      : ((t * 1.0) / 10000).toFixed(2) +
      ' <span style="color: #ff0000;">万元</span>'
  }
  const showTuition = () => {
    let tuitionBox = document.querySelector('.tuitionbox-container')
    if (tuitionBox) {
      let tuitionInputs = tuitionBox.querySelectorAll('input')
      let tuitionMinInput = tuitionInputs[0]
      let tuitionMaxInput = tuitionInputs[1]
      tuitionMinInput.addEventListener('input', showTuition, false)
      tuitionMaxInput.addEventListener('input', showTuition, false)

      let tuitionMin = tuitionMinInput.value
      let tuitionMax = tuitionMaxInput.value
      let tuitionText =
        formateTuition(parseInt(tuitionMin)) +
        ` — ` +
        formateTuition(parseInt(tuitionMax))

      let tuitionContent = document.querySelector('#tuitionContent')
      if (tuitionContent) {
        tuitionContent.innerHTML = tuitionText
      } else {
        tuitionContent = document.createRange().createContextualFragment(
          `
          <div id="tuitionContent" style="font-size: 16px;cursor: pointer;cursor: text;padding: 10px;color: #0fc16b;">
            ` +
          tuitionText +
          `
          </div>
        `
        )
        tuitionBox.appendChild(tuitionContent)
      }
    }
  }
  document.addEventListener('mousemove', showTuition, false)
  /* 处理学费区间 End*/

  /* 提前批不支持一键填报 Start */
  let ai = document.querySelector('.AiMockexam-footer')
  if (ai && ai.innerText == '') {
    ai.innerText = '提示：提前批不支持Ai一键填报，请用人工筛选。'
    ai.style.fontSize = '16px'
    ai.style.color = 'red'
    ai.style.justifyContent = 'flex-end'
  }
  /* 提前批不支持一键填报 End */

  /* 添加风险样色图例 Start */
  let examTypeBox = document.querySelector('.exam-type-box')
  if (examTypeBox) {
    let tableTools = examTypeBox.nextSibling
    let colorLegends = document.createRange().createContextualFragment(`
    <div id="colorLegends" >
        <span style="background-color: #ff7171;"></span>高危
        <span style="background-color: #ffc938;"></span>冲刺
        <span style="background-color: #5e95fd;"></span>适合
        <span style="background-color: #75dea7;"></span>稳妥
    </div>
  `)
    examTypeBox.parentElement.insertBefore(colorLegends, tableTools)
  }
  /* 添加风险样色图例 end */

  /* 优化填报模式下拉框 Start */

  let menu = document.querySelector('#userDetail > div.header > div.menu')
  let fillMethod = document.querySelector(
    '#userDetail > div.header > div.tools > div.select-box'
  )
  let menuLast = document.querySelector(
    '#userDetail > div.header > div.menu > div.step-data-sync'
  )

  if (fillMethod) {
    menu.insertBefore(fillMethod, menuLast)
    window.getComputedStyle(fillMethod).opacity
    fillMethod.classList.add('fillMethod')
  }
  /* 优化填报模式下拉框 End */

  /* 专业备注关键词 自动输入 Start */
  let proFilterInput = document.querySelector(
    '#AiFilterApp > div.filter-content > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div > input'
  )
  let hotBtn = document.querySelector(
    '#AiFilterApp > div.filter-content > div:nth-child(1) > div.sub-tit-box > div.hot-search'
  )

  if (proFilterInput && hotBtn) {
    proFilterInput.addEventListener('click', () => {
      hotBtn.dispatchEvent(new Event('click', { bubbles: true }))
      window.setTimeout(key2Btn, 500)
    })
    hotBtn.addEventListener('click', () => {
      window.setTimeout(key2Btn, 500)
    })
  }
  let clearBtn = document.createRange().createContextualFragment(`
                <span class="el-input__suffix"><span class="el-input__suffix-inner"><!----><i class="el-input__icon el-icon-circle-close el-input__clear"></i><!----><!----></span><!----></span>
              `)
  if (proFilterInput) {
    proFilterInput.style.paddingRight = '30px'
    let clrBtn = proFilterInput.parentElement.querySelector('.el-input__clear')
    if (!clrBtn) {
      proFilterInput.parentElement.appendChild(clearBtn)
    }
    clrBtn = proFilterInput.parentElement.querySelector('.el-input__clear')
    if (clrBtn) {
      clrBtn.style.display = 'none'
      clrBtn.addEventListener('click', () => {
        proFilterInput.value = ''
        clrBtn.style.display = 'none'
        proFilterInput.dispatchEvent(new Event('input', { bubbles: true }))
        proFilterInput.dispatchEvent(new Event('change', { bubbles: true }))
      })
      proFilterInput.addEventListener('input', () => {
        if (proFilterInput.value.length > 0) {
          clrBtn.style.display = 'inline-block'
        } else {
          clrBtn.style.display = 'none'
        }
        let dialogClsBtn = document.querySelector(
          '#AiFilterApp > div.el-dialog__wrapper > div > div.el-dialog__header > button'
        )
        if (dialogClsBtn) {
          dialogClsBtn.dispatchEvent(new Event('click', { bubbles: true }))
        }
      })
      proFilterInput.addEventListener('focus', () => {
        if (proFilterInput.value.length > 0) {
          clrBtn.style.display = 'inline-block'
        }
      })
      proFilterInput.parentElement.addEventListener('mouseover', () => {
        if (proFilterInput.value.length > 0) {
          clrBtn.style.display = 'inline-block'
        }
      })
      proFilterInput.addEventListener('blur', () => {
        clrBtn.style.display = 'none'
      })
    }
  }
  const changProFilter = keyWord => {
    if (proFilterInput && keyWord != '') {
      proFilterInput.value = keyWord
      proFilterInput.dispatchEvent(new Event('input', { bubbles: true }))
      proFilterInput.dispatchEvent(new Event('change', { bubbles: true }))
      let dialogClsBtn = document.querySelector(
        '#AiFilterApp > div.el-dialog__wrapper > div > div.el-dialog__header > button'
      )
      if (dialogClsBtn) {
        dialogClsBtn.dispatchEvent(new Event('click', { bubbles: true }))
      }
    }
  }
  const key2Btn = () => {
    let keyCells = document.querySelectorAll(
      '.hot-search-dialog tr td:last-child'
    )
    keyCells.forEach((cell, index) => {
      if (index > 0 && !cell.querySelector('span')) {
        let keys = cell.innerText.split('、')
        cell.innerHTML = ''
        console.log(keys)
        keys.forEach(kw => {
          let keySpan = document.createRange().createContextualFragment(
            `
                <span style="cursor: pointer;border: 1px solid #cccccc;padding: 2px;margin: 0px 5px;border-radius: 5px;">
                  ` +
            kw +
            `
                </span>
              `
          )
          cell.appendChild(keySpan)
        })
        if (index === (keyCells.length - 1)) {
          let keySpan = document.createRange().createContextualFragment(
            `
                <span style="cursor: pointer;border: 1px solid #cccccc;padding: 2px;margin: 0px 5px;border-radius: 5px;color:red;">
                  职业教育
                </span>
              `
          )
          cell.appendChild(keySpan)
        }
        let keyBtns = document.querySelectorAll(
          '.hot-search-dialog tr td:last-child span'
        )
        keyBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            changProFilter(btn.innerText)
          })
        })
      }
    })
  }

  /* 专业备注关键词 自动输入 End */
})
