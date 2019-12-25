#!/bin/sh

PACKAGE_VERSION=$(cat ../package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $PACKAGE_VERSION" "${PROJECT_DIR}/${INFOPLIST_FILE}"
echo "dagouzhi: Set :CFBundleShortVersionString $PACKAGE_VERSION"

codePush_ios_key_staging=$(cat ../package.json | grep codePush_ios_key_staging | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
codePush_ios_key_production=$(cat ../package.json | grep codePush_ios_key_production | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

/usr/libexec/PlistBuddy -c "Set :CodePushDeploymentKey test_key" "${PROJECT_DIR}/${INFOPLIST_FILE}"

if [ $CONFIGURATION == Debug ]; then

/usr/libexec/PlistBuddy -c "Set :CodePushDeploymentKey $codePush_ios_key_staging" "${PROJECT_DIR}/${INFOPLIST_FILE}"

fi

if [ $CONFIGURATION == DebugProduction ]; then

/usr/libexec/PlistBuddy -c "Set :CodePushDeploymentKey $codePush_ios_key_production" "${PROJECT_DIR}/${INFOPLIST_FILE}"

fi

if [ $CONFIGURATION == DebugQa ]; then

/usr/libexec/PlistBuddy -c "Set :CodePushDeploymentKey $codePush_ios_key_staging" "${PROJECT_DIR}/${INFOPLIST_FILE}"

fi

if [ $CONFIGURATION == Release ]; then

/usr/libexec/PlistBuddy -c "Set :CodePushDeploymentKey $codePush_ios_key_staging" "${PROJECT_DIR}/${INFOPLIST_FILE}"

fi

if [ $CONFIGURATION == ReleaseProduction ]; then

/usr/libexec/PlistBuddy -c "Set :CodePushDeploymentKey $codePush_ios_key_production" "${PROJECT_DIR}/${INFOPLIST_FILE}"

fi

if [ $CONFIGURATION == ReleaseQa ]; then

/usr/libexec/PlistBuddy -c "Set :CodePushDeploymentKey $codePush_ios_key_staging" "${PROJECT_DIR}/${INFOPLIST_FILE}"

fi
