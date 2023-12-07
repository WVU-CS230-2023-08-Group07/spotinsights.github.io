const firebaseConfig = {
	apiKey: "AIzaSyCiaoHpxeFZWA4gb6NJzMGunj7ytNSChKY",
	authDomain: "spotinsights.firebaseapp.com",
	projectId: "spotinsights",
	storageBucket: "spotinsights.appspot.com",
	messagingSenderId: "293805645735",
	appId: "1:293805645735:web:490f3ccf4444b613f16082"
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();