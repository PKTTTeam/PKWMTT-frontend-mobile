# 🚀 PKWMTT App

---

## 📦 Tech Stack

- **Mobile Framework:** [React Native](https://reactnative.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Navigation:** [React Navigation](https://reactnavigation.org/)
- **State Management:** React Hooks
- **Styling:** [React Native StyleSheet](https://reactnative.dev/docs/stylesheet)
- **Testing:** [Jest](https://jestjs.io/) & [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- **Containerization:** [Docker](https://www.docker.com/) 
- **CI:** [GitHub Actions](https://github.com/features/actions)

---

---

### ⚙️ Setup for normal use case

- For testing or side-loading on your Android device, go to the [Releases](https://github.com/PKTTTeam/PKWMTT-frontend-mobile/releases) section, download the newest ```.apk```, and install it manually.

- For **Google Play distribution**, the app is built as an ```.aab``` (Android App Bundle) and uploaded directly to the Play Store. End-users should normally download it from Google Play.

---

## 📋 Prerequisites for Development
Before setting up the project, ensure you have the following installed:

- **OpenJDK 20** - Required for Android development
- **ADB (Android Debug Bridge)** - Required for Android device/emulator communication
- **Android Emulator** - Required for testing on virtual devices
- **Node.js** (version 18 or higher recommended)
- **npm**

## ⚙️ Setup & Installation for Development

### 1. Clone the repository

```shell
git clone https://github.com/PKTTTeam/PKWMTT-frontend-mobile.git
cd PKWMTT
```

### 2. Install Dependencies

```shell
npm install
```


### 3. Run the App

For iOS:

```shell
npx react-native run ios
```

For Android:

```shell
npx react-native run android
```

Alternatively, start the Metro bundler:

```shell
npm start
```

---

## 🧪 Testing

Run tests with:

```shell
npm run test
```

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit and push your changes:
    ```shell
    git commit -m "feat: add new feature"
    git push
    ```
5. Submit a pull request 🚀

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## 💬 Contact

For questions, suggestions, or collaboration:

- **GitHub Issues:** [Submit here](https://github.com/PKTTTeam/PKWMTT-frontend-mobile/issues)
- **Team:** [@PKTTTeam](https://github.com/PKTTTeam)

---

## 🌐 Related Projects

- [PKWM Timetable Backend](https://github.com/PKTTTeam/PKWMTT-backend)
- [PKWM Timetable Frontend Web](https://github.com/PKTTTeam/PKWMTT-frontend-web)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)


---

## 📸 Screenshots

<table>
<tr>
<td align="center">
  <strong>Timetable Screen</strong><br>
  <img width="232" height="485" alt="Timetable Screen" src="https://github.com/user-attachments/assets/06ca269c-d267-4e51-9e16-c1819dc8b3c3" />
</td>
<td align="center">
  <strong>Calendar Screen</strong><br>
  <img width="236" height="481" alt="Activity Legend Modal" src="https://github.com/user-attachments/assets/0ceacf1d-9734-466f-8ff9-28da2fc220da" />
</td>
<td align="center">
  <strong>Activity Legend Modal</strong><br>
  <img width="236" height="481" alt="Activity Legend Modal" src="https://github.com/user-attachments/assets/45b1a65e-b1ff-4684-aea5-33ed8b20e308" />
</td>
<td align="center">
  <strong>Connection Alert Modal</strong><br>
  <img width="236" height="481" alt="Activity Legend Modal" src="https://github.com/user-attachments/assets/441f77fb-576a-493b-aed4-02a0393377a7" />
</td>
</tr>
</table>



---
