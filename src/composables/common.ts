/**
 * 页面放回按钮
 */
export const onBack = () => {
  // cocos 交互方法
  // v 固定值
  // type 学科类型 writing、science
  document.location = "back://v=1&type=writing";
  // u3d 交互方法
  // https://docs.uniwebview.com/guide/working-with-code.html#web-view-to-unity-messaging-system
  // window.location.href = `uniwebview://back-page?v=1&type=science`
};
