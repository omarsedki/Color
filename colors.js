
 Color={

log:function()
{
document.getElementById('log').innerHTML+="<div style='float:left;opacity:"+this.opacity_Value+";color:white;padding:10px;background-color:"+this.Hex+"'>"+this.Hex+"</div>";

return this;
},

updateRGBfromHex: function(){

this.red_Value=parseInt((this.Hex).substring(1,3),16);
this.green_Value=parseInt((this.Hex).substring(3,5),16);
this.blue_Value=parseInt((this.Hex).substring(5,7),16);
return this;
},

updateRGBfromHSL:function(){

var r, g, b;

    if(this.saturation_Value == 0){
        r = g = b = this.lightness_Value; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = this.lightness_Value < 0.5 ? this.lightness_Value * (1 + this.saturation_Value) : this.lightness_Value + this.saturation_Value - this.lightness_Value * this.saturation_Value;
        var p = 2 * this.lightness_Value - q;
        r = hue2rgb(p, q, this.hue_Value + 1/3);
        g = hue2rgb(p, q, this.hue_Value);
        b = hue2rgb(p, q, this.hue_Value - 1/3);
    }

this.red_Value=Math.round(r * 255);
this.green_Value=Math.round(g * 255);
this.blue_Value= Math.round(b * 255);


return this;
},

updateHSLfromRGB:function(){

r =this.red_Value/ 255, g =this.green_Value/ 255, b =this.blue_Value/ 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

Color.hue_Value=h
Color.saturation_Value=s
Color.lightness_Value=l
return this;
},

updateHEXfromRGB: function(){

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

this.Hex="#"+componentToHex(this.red_Value) + componentToHex(this.green_Value) + componentToHex(this.blue_Value);

return this;
},





 red: function(value){
if(value===undefined){return this.red_Value}
if(value!==undefined){this.red_Value=value;return this.updateHEXfromRGB().updateHSLfromRGB().log();}
},
green : function(value){
if(value===undefined){return this.green_Value}
if(value!==undefined){this.green_Value=value;return this.updateHEXfromRGB().updateHSLfromRGB().log();}
},
blue: function(value){
if(value===undefined){return this.blue_Value}
if(value!==undefined){this.blue_Value=value;return this.updateHEXfromRGB().updateHSLfromRGB().log();}
},

hue: function(value){
if(value===undefined){return Math.round(this.hue_Value*360)}
if(value!==undefined){this.hue_Value=value/360;return this.updateRGBfromHSL().updateHEXfromRGB().log();}
},

spin: function(value){
if(value!==undefined){this.hue_Value=(this.hue_Value+(parseFloat(value)/100))%1;return this.updateRGBfromHSL().updateHEXfromRGB().log();}
},

saturate: function(value){
if(value!==undefined){this.saturation_Value=(this.saturation_Value+(parseFloat(value)/100));if(this.saturation_Value>1){this.saturation_Value=1};return this.updateRGBfromHSL().updateHEXfromRGB().log();}
},

desaturate: function(value){
if(value!==undefined){this.saturation_Value=(this.saturation_Value-(parseFloat(value)/100));if(this.saturation_Value<0){this.saturation_Value=0};return this.updateRGBfromHSL().updateHEXfromRGB().log();}
},

lighten: function(value){
if(value!==undefined){this.lightness_Value=(this.lightness_Value+(parseFloat(value)/100));if(this.lightness_Value>1){this.lightness_Value=1};return this.updateRGBfromHSL().updateHEXfromRGB().log();}
},

darken: function(value){
if(value!==undefined){this.lightness_Value=(this.lightness_Value-(parseFloat(value)/100));if(this.lightness_Value<0){this.lightness_Value=0};return this.updateRGBfromHSL().updateHEXfromRGB().log();}
},

fadein: function(value){
if(value!==undefined){this.opacity_Value=(this.opacity_Value+(parseFloat(value)/100));if(this.opacity_Value>1){this.opacity_Value=1};return this.updateRGBfromHSL().updateHEXfromRGB().log();}
},

fadeout: function(value){
if(value!==undefined){this.opacity_Value=(this.opacity_Value-(parseFloat(value)/100));if(this.opacity_Value<0){this.opacity_Value=0};return this.updateRGBfromHSL().updateHEXfromRGB().log();}
},

fade: function(value){
if(value!==undefined){this.opacity_Value=((parseFloat(value)/100));if(this.opacity_Value<0){this.opacity_Value=0};if(this.opacity_Value<0){this.opacity_Value=0};return this.updateRGBfromHSL().updateHEXfromRGB().log();}
},

rgba: function(value){
if(value===undefined){rgba_value="rgba("+this.red_Value+","+this.green_Value+","+this.blue_Value+","+this.opacity_Value+")" ;return rgba_value}
},

};







function color(TheColor)
{

if(typeof TheColor=="undefined"){TheColor="#000000"}
if( typeof TheColor=="string"&& TheColor.substring(0, 1)=="#" && TheColor.length==7 ){
Color.Hex=TheColor;
Color.opacity_Value=1;
return Color.updateRGBfromHex().updateHSLfromRGB().log();
}

if (typeof TheColor=="string"&& TheColor.substring(0, 3)=="rgb" ){
colors= TheColor.substring(TheColor.indexOf('(') + 1, TheColor.lastIndexOf(')')).split(/,\s*/);
Color.red_Value=Number(colors[0]);
Color.green_Value=Number(colors[1]);
Color.blue_Value=Number(colors[2]);
Color.opacity_Value=1
if(TheColor.substring(0, 4)=="rgba"){Color.opacity_Value=Number(colors[3]);}

return Color.updateHEXfromRGB().updateHSLfromRGB().log();
}

if (typeof TheColor=="string"&& TheColor.substring(0, 3)=="hsl" ){
colors= TheColor.substring(TheColor.indexOf('(') + 1, TheColor.lastIndexOf(')')).split(/,\s*/);
Color.hue_Value=parseFloat(colors[1]) / 360;
console.log(Color.hue_Value)
Color.saturation_Value=parseFloat(colors[1]) / 100;
Color.lightness_Value=parseFloat(colors[2]) / 100;
Color.opacity_Value=1;
if(TheColor.substring(0, 4)=="hsla"){Color.opacity_Value=Number(colors[3]);}

return Color.updateRGBfromHSL().updateHEXfromRGB().log();
}


}
