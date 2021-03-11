/**
 * @from  d2-admin https://github.com/d2-projects/d2-admin/blob/master/src/api/_service.js
 * @author FairyEver<https://github.com/FairyEver>
 */

/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
 * @return {String} 16进制RGB
 */
const typeColor = (type = 'default') => {
  let color = ''
  color = type == 'default' ? '#35495E'
    : type == 'primary' ? '#3488ff'
      : type == 'success' ? '#43B883'
        : type == 'warning' ? '#e6a23c'
          : type == 'danger' ? '#f56c6c'
            : '#00000'
  return color
}

/**
 * @description 打印彩色文字
 */
const colorful = (textArr) => {
  console.log(
    `%c${textArr.map(t => t.text || '').join('%c')}`,
    ...textArr.map(t => `color: ${typeColor(t.type)};`)
  )
}

/**
 * @description 打印 default 样式的文字
 */
export default function (text) {
  colorful([{ text }])
}

/**
 * @description 打印一个 [ title | text ] 样式的信息
 * @param {String} title title text
 * @param {String} info info text
 * @param {String} type style
 */
export function capsule(title, info, type = 'primary') {
  console.log(
    `%c ${title} %c ${info} %c`,
    'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
    `background:${typeColor(type)}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
    'background:transparent'
  )
}

/**
 * @description 打印 primary 样式的文字
 */
export function primary(text) {
  colorful([{ text, type: 'primary' }])
}

/**
 * @description 打印 success 样式的文字
 */
export function success(text) {
  colorful([{ text, type: 'success' }])
}

/**
 * @description 打印 warning 样式的文字
 */
export function warning(text) {
  colorful([{ text, type: 'warning' }])
}

/**
 * @description 打印 danger 样式的文字
 */
export function danger(text) {
  colorful([{ text, type: 'danger' }])
}
