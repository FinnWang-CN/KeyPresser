# KeyPresser website

Official website: https://keypresser.onepeak.cn/

The complete static website was migrated from `wang161113/wang161113.github.io` at commit `4bf1c3aebd06f90100cbc94fd1ebef156c52d6dc`. HTML, assets, language switching, downloads, robots and sitemap files are preserved without content changes. Original file history remains available in the former repository.

GitHub Actions deploys this directory on pushes to `master` affecting `website/`. The project Pages custom domain is `keypresser.onepeak.cn`; the account-level Pages site is no longer required. DNS remains a CNAME to `wang161113.github.io`.

Local preview: `python3 -m http.server 8080 --directory website`.

Update all language variants together. Domain migration does not change the application source or its releases.
