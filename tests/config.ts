export const websites: Record<string, any> = {
    saucedemo: {
        name: 'saucedemo',
        baseUrl: 'https://www.saucedemo.com/',
        loginUrl: 'https://practicetestautomation.com/practice-test-login/',
        validUsername: 'standard_user',
        lockedUsername: 'locked_out_user',
        password: 'secret_sauce',
        invalidPassword: '1234',
        loginSuccessUrl: 'Products',
        loginSuccessMessage: 'Products',
        invalidUsernameMessage: /Your username is invalid!/i,
        invalidPasswordMessage: /Your password is invalid!/i,
        lockOutUserMessage: /Epic sadface: Sorry, this user has been locked out./i,
        logoutCTA: 'a:text("Log out")'
    },
    practicetestautomation: {
        name: 'practicetestautomation',
        baseUrl: 'https://practicetestautomation.com/',
        loginUrl: 'https://practicetestautomation.com/practice-test-login/',
        validUsername: 'student',
        validPassword: 'Password123',
        invalidUsername: 'invalidUser',
        invalidPassword: '1234',
        loginSuccessUrl: 'practicetestautomation.com/logged-in-successfully/',
        loginSuccessMessage: /Congratulations|successfully logged in/i,
        invalidUsernameMessage: /Your username is invalid!/i,
        invalidPasswordMessage: /Your password is invalid!/i,
        logoutCTA: 'a:text("Log out")'
    },
    automationteststore: {
        name: 'automationteststore',
        baseUrl: 'https://automationteststore.com/',
        loginUrl: 'https://automationteststore.com/index.php?rt=account/login',
        // CTA Selectors
        dashboardCtas: {
            HomeCTA: '//*[@id="categorymenu"]/nav/ul/li[1]/a',
            ApparelAccesoriesCTA: '//*[@id="categorymenu"]/nav/ul/li[2]/a',
            MakeupCTA: '//*[@id="categorymenu"]/nav/ul/li[3]/a',
            SkinCareCTA: '//*[@id="categorymenu"]/nav/ul/li[4]/a',
            FraganceCTA: '//*[@id="categorymenu"]/nav/ul/li[5]/a',
            MenCTA: '//*[@id="categorymenu"]/nav/ul/li[6]/a',
            HairCareCTA: '//*[@id="categorymenu"]/nav/ul/li[7]/a',
            BooksCTA: '//*[@id="categorymenu"]/nav/ul/li[8]/a',
            SpecialsCTA: '//*[@id="main_menu_top"]/li[1]',
        }as Record<string, string>,
        specialViewCtas: {
            SpecialSortSelect: '//*[@id="sort"]',
            SpecialZAOption: '//*[@id="sort"]/option[3]',
        }as Record<string, string>,
        MsgValidation: {
            SpecialScreenMsg: 'Special Offers',
        }as Record<string, string>,
    }
};
