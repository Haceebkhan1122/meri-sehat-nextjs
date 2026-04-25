import OneSignal from 'react-onesignal';
import API from '.';

export async function updateOneSignalUser(response) {
    let externalUserId = response?.data?.user?.id?.toString();

    const userId = await OneSignal.getUserId();

    if (externalUserId) {
        await OneSignal.setExternalUserId(externalUserId);
    }

    const payload = {
        user_id: externalUserId,
        player_id: userId
    };
    // console.log(payload);
    const res = await API.post('/onesignal/player', payload);
}

export default async function runOneSignal(response) {
    // let externalUserId = response?.data?.user?.id?.toString();
    // // await OneSignal.setSubscription(true);
    // // Set external user ID before subscribing
    // if (externalUserId) {
    //     await OneSignal.setExternalUserId(externalUserId);
    // }
    // Request user consent
    // await OneSignal.provideUserConsent(true);
    // Subscribe user
    // Display subscription prompt
    // Get user ID after subscription
    // console.log("WAIITTTTT ....")

    //await OneSignal.provideUserConsent(true).then(async () => {
    // await OneSignal.init({ appId: 'a4d7ae38-4618-475c-984f-841dc0baed60' }).then(async () => {
    //     console.log("WAITINGGGG....")
    //     await  OneSignal.showSlidedownPrompt().then(() => {
    //         console.log("WAITINGGGG 22....")
    //     });
    //   })

    //});


    //await OneSignal.provideUserConsent(true);
    await OneSignal.init({ appId: process.env.NEXT_PUBLIC_BASE_URL });
    await OneSignal.showSlidedownPrompt();

    const userId = await OneSignal.getUserId();
    // await OneSignal.init({
    //     appId: 'a4d7ae38-4618-475c-984f-841dc0baed60',
    //     allowLocalhostAsSecureOrigin: true,
    //     // safari_web_id: "web.onesignal.auto.58b504fd-a471-4836-bd65-020899577e4e",
    //     // notifyButton: {
    //     //   enable: true,
    //     // },
    //   });




    // await OneSignal.setSubscription(true).then()

    // OneSignal.showSlidedownPrompt();
    // OneSignal.registerForPushNotifications();
    // const userId = await OneSignal.getUserId();
    // console.log("OneSignal User ID:", userId);

    // Update player ID on the server
    // const payload = {
    //     user_id: response?.data?.user?.id,
    //     player_id: userId
    // };
    // console.log(payload);
    // const res = await API.post('/onesignal/player', payload);
    // console.log(res, "res");
}