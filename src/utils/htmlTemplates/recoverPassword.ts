export type TRecoverPasswordTemplate = {
   email: string;
   link: string;
};

const recoverPassword = (context: TRecoverPasswordTemplate) => {
   return `
   <!doctype html>
   <html>
     <body>
       <div
         style='background-color:#FFFFFF;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
       >
         <table
           align="center"
           width="100%"
           style="margin:0 auto;max-width:600px;background-color:#FFFFFF"
           role="presentation"
           cellspacing="0"
           cellpadding="0"
           border="0"
         >
           <tbody>
             <tr style="width:100%">
               <td>
                 <div style="padding:0px 24px 0px 24px">
                   <table
                     align="center"
                     width="100%"
                     cellpadding="0"
                     border="0"
                     style="table-layout:fixed;border-collapse:collapse"
                   >
                     <tbody style="width:100%">
                       <tr style="width:100%">
                         <td
                           style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:10.666666666666666px"
                         >
                           <div style="padding:16px 24px 16px 24px">
                             <img
                               alt="Votes"
                               src="${process.env.ICON}"
                               style="outline:none;border:none;text-decoration:none;vertical-align:middle;display:inline-block;max-width:100%"
                             />
                           </div>
                         </td>
                         <td
                           style="box-sizing:content-box;vertical-align:middle;padding-left:5.333333333333333px;padding-right:5.333333333333333px"
                         >
                           <h1
                             style="font-weight:bold;margin:0;font-size:32px;padding:16px 24px 0px 0px"
                           >
                             Votes
                           </h1>
                         </td>
                         <td
                           style="box-sizing:content-box;vertical-align:middle;padding-left:10.666666666666666px;padding-right:0"
                         >
                           <div style="padding:16px 24px 16px 24px">
                             <div style="height:16px"></div>
                           </div>
                         </td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
                 <div style="padding:16px 0px 16px 0px">
                   <hr
                     style="width:100%;border:none;border-top:1px solid #CCCCCC;margin:0"
                   />
                 </div>
                 <h3
                   style="font-weight:bold;text-align:left;margin:0;font-size:20px;padding:12px 24px 12px 24px"
                 >
                   Reset your password?
                 </h3>
                 <div
                   style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:8px 24px 16px 24px"
                 >
                   If you didn&#x27;t request a reset, don&#x27;t worry. You can
                   safely ignore this email.
                 </div>
                 <div style="text-align:left;padding:12px 24px 12px 24px">
                   <a
                     href="${context.link}"
                     style="color:#FFFFFF;font-size:14px;font-weight:bold;background-color:#00BD6E;border-radius:4px;display:inline-block;padding:12px 20px;text-decoration:none"
                     target="_blank"
                     ><span
                       ><!--[if mso
                         ]><i
                           style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:30"
                           hidden
                           >&nbsp;</i
                         ><!
                       [endif]--></span
                     ><span>Change my password</span
                     ><span
                       ><!--[if mso
                         ]><i
                           style="letter-spacing: 20px;mso-font-width:-100%"
                           hidden
                           >&nbsp;</i
                         ><!
                       [endif]--></span
                     ></a
                   >
                 </div>
                 <div style="padding:16px 24px 16px 24px">
                   <hr
                     style="width:100%;border:none;border-top:1px solid #EEEEEE;margin:0"
                   />
                 </div>
                 <div
                   style="color:#474849;font-size:12px;font-weight:normal;text-align:left;padding:4px 24px 24px 24px"
                 >
                   Need help? Just reply to this email to contact support.
                 </div>
               </td>
             </tr>
           </tbody>
         </table>
       </div>
     </body>
   </html>

   `;
};

export default recoverPassword;
