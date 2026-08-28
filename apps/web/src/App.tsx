// import { GuitarIcon } from "@/shared/ui/assets/icons";
//
// function App() {
//   const [count, setCount] = useState(0);
//
//   const handleClick = () => {
//     setCount((count) => count + 1);
//
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-expect-error
//     if (window.ReactNativeWebView) {
//       // Отправляем сообщение. Данные должны быть строкой, поэтому используем JSON.stringify
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-expect-error
//       window.ReactNativeWebView.postMessage(
//         JSON.stringify({
//           type: "SHOW_AD",
//           data: {
//             /* любые дополнительные данные */
//           },
//         }),
//       );
//     } else {
//       // Если мы не в WebView, можно выполнить какое-то другое действие
//       console.log("Реклама будет показана в вебе");
//     }
//   };
//
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-expect-error
//   // eslint-disable-next-line react-hooks/immutability
//   window.onAdCompleted = function (rewardData) {
//     console.log("Реклама завершена. Награда:", rewardData);
//     // Здесь можно обновить интерфейс, например, показать сообщение пользователю
//     alert("Вы получили награду!");
//   };
//
//   return (
//     <div
//       className={"relative w-[100vw] h-[100vh] overflow-hidden"}
//       style={{
//         background:
//           "radial-gradient(circle_at 20% 20%,rgba(124,58,237,.35),transparent 30%),radial-gradient(circle at 80% 30%,rgba(0,212,255,.2),transparent 25%),radial-gradient(circle at 50% 80%,rgba(124,58,237,.25),transparent 30%);",
//       }}
//     >
//
//       <img
//         src={GuitarIcon}
//         className={
//           "absolute top-0 translate-y-[200%] left-1/2 -translate-x-1/2 scale-[550%]"
//         }
//         alt="Vite logo!!!"
//       />
//       <div
//         className={
//           "w-10 h-1 bg-green-700 absolute left-1/2 -translate-x-1/2 top-0 translate-y-[200%]"
//         }
//       />
//     </div>
//   );
// }
//
// export default App;
