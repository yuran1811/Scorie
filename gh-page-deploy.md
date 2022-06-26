```json
{
	"homepage": "https://github.com/yuran1811/Scorie",
	"devDependencies": {
		...,
		"gh-pages": "^4.0.0"
	},
	"scripts": {
		...,
		"build": "react-scripts build",
		"predeploy": "npm run build",
		"deploy": "gh-pages -d build"
	}
}
```
