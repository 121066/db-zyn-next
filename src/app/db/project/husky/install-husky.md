## 安装 husky

```
npm install husky --save-dev # 安装husky
npx husky install # 初始化husky
npx husky add .husky/pre-commit "npm run lint" # 添加pre-commit钩子
npx husky add .husky/pre-push "npm run test" # 添加pre-push钩子
```

## 添加 git 钩子

```
npx husky add .husky/pre-commit "echo 'Running pre-commit hook...'" # 添加pre-commit钩子
npx husky add .husky/pre-push "echo 'Running pre-push hook...'" # 添加pre-push钩子
npx husky add .husky/commit-msg "echo 'Running commit-msg hook...'" # 添加commit-msg钩子
```

## 添加 package.json 脚本

```
"scripts": {
    "lint": "eslint --ext .js,.vue src",
    "test": "jest"
}
"husky": {}
"lint-staged": {
    "*.{js,vue}": [
        "eslint --fix",
        "git add"
    ]
}
```
