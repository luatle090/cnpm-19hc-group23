function phanCachTien({}, money){
    if(isNaN(money))
        money = Number(money);

    if(money < 1000)
        return money;
    
    let n = money;
    let soDu = 0;
    let count = 0;
    let str = "";

    while(n > 0) {
        soDu = n % 10;
        if(count === 3){
            str = soDu + "," + str;
            count = 0;
        }
        else {
            str = soDu + str;
        }
        count++;
        n = parseInt(n / 10);
    }
    str += ' VNĐ';
    return str;
}

var fonts = {
	Roboto: {
		normal: 'fonts/Roboto-Regular.ttf',
		bold: 'fonts/Roboto-Medium.ttf',
		italics: 'fonts/Roboto-Italic.ttf',
		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
	}
};

module.exports = {
    phanCachTien,
    fonts
}