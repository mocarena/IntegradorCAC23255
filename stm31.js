// Ver: 3.77
var nOP=0,nOP5=0,nIE=0,nIE4=0,nIE5=0,nNN=0,nNN4=0,nNN6=0,nMac=0,nIEM=0,nIEW=0,nSTMENU=0,NS4=0,nVer=0.0;
bDelBorder=0;bAddBorder=0;detectNav();
bFtReg=1;
var nTopTb=nIE||nOP&&nVer>=6.0;

if(nNN4){	doitovNN4=getEventCode('doitov',1);doitouNN4=getEventCode('doitou',1);doitckNN4=getEventCode('doitck',1);dombovNN4=getEventCode('dombov',0);dombouNN4=getEventCode('dombou',0);	}

var MaxMenuNumber=10;
var HideSelect=1;
var HideObject=0;
var HideIFrame=0;

if(nNN6)	HideSelect=0;
if((nIEW&&nVer>=5.5)||nNN6)	HideIFrame=0;
var st_ht="";
var st_gcount=0;
var st_rl_id=null;
var st_cl_w,st_cl_h;
var st_cumei=0,st_cumbi,st_cuiti;
var st_rei=/STM([0-9]*)XX([0-9]*)YY([0-9]*)ZZ/;
var st_reb=/STM([0-9]*)XX([0-9]*)YY/;
var st_menus=[];
var st_buf=[];
var st_loaded=0;
var st_scrollid=null;

if(nIE4||nNN4)	window.onerror=function(sMsg,sUrl,sLine)
{
	return !confirm("Java Script Error\n"+"\nDescription:"+sMsg+"\nSource:"+sUrl+"\nLine:"+sLine+"\n\nSee more details?");
}

if(nSTMENU)		window.onload=st_onload;
if(nIEM||nOP5)	window.onunload=function(){if(st_rl_id){clearInterval(st_rl_id);st_rl_id=null;}return true;}

if(typeof(st_jsloaded)=='undefined'){
if(nSTMENU&&!nNN4)
{
	var s="<STYLE>\n.st_tbcss,.st_tdcss,.st_divcss,.st_ftcss{border:none;padding:0px;margin:0px;}\n</STYLE>";
	for(i=0;i<MaxMenuNumber;i++)
		s+="<FONT ID=st_global"+i+"></FONT>";
	if(nIEW&&nVer>=5.0&&document.body)
		document.body.insertAdjacentHTML("AfterBegin",s);
	else
		document.write(s);
}
st_jsloaded=1;}

st_fl_id=["Box in","Box out","Circle in","Circle out","Wipe up","Wipe down","Wipe right","Wipe left","Vertical blinds","Horizontal blinds","Checkerboard across","Checkerboard down","Random dissolve","Split vertical in","Split vertical out","Split horizontal in","Split horizontal out","Strips left down","Strips left up","Strips right down","Strips right up","Random bars horizontal","Random bars vertical","Random filter","Fade",
	"Wheel","Slide","Slide push","Spread","Pixelate","Stretch right","Stretch horizontally","Cross in","Cross out","Plus in","Plus out","Star in","Star out","Diamond in","Diamond out","Checkerboard up","Checkerboard left","Blinds up","Blinds left","Wipe clock","Wipe wedge","Wipe radial","Spiral","Zigzag"];
st_fl_string=
[
	"Iris(irisStyle=SQUARE,motion=in)","Iris(irisStyle=SQUARE,motion=out)","Iris(irisStyle=CIRCLE,motion=in)","Iris(irisStyle=CIRCLE,motion=out)",
	"Wipe(GradientSize=1.0,wipeStyle=1,motion=reverse)","Wipe(GradientSize=1.0,wipeStyle=1,motion=forward)","Wipe(GradientSize=1.0,wipeStyle=0,motion=forward)","Wipe(GradientSize=1.0,wipeStyle=0,motion=reverse)",
	"Blinds(bands=8,direction=RIGHT)","Blinds(bands=8,direction=DOWN)",
	"Checkerboard(squaresX=16,squaresY=16,direction=right)","Checkerboard(squaresX=12,squaresY=12,direction=down)","RandomDissolve()",
	"Barn(orientation=vertical,motion=in)","Barn(orientation=vertical,motion=out)","Barn(orientation=horizontal,motion=in)","Barn(orientation=horizontal,motion=out)",
	"Strips(Motion=leftdown)","Strips(Motion=leftup)","Strips(Motion=rightdown)","Strips(Motion=rightup)",
	"RandomBars(orientation=horizontal)","RandomBars(orientation=vertical)","","Fade(overlap=.5)",
	"Wheel(spokes=16)","Slide(slideStyle=hide,bands=15)","Slide(slideStyle=swap,bands=15)","Inset()","Pixelate(MaxSquare=15)",
	"Stretch(stretchStyle=hide)","Stretch(stretchStyle=spin)",
	"Iris(irisStyle=cross,motion=in)","Iris(irisStyle=cross,motion=out)","Iris(irisStyle=plus,motion=in)","Iris(irisStyle=plus,motion=out)","Iris(irisStyle=star,motion=in)","Iris(irisStyle=star,motion=out)","Iris(irisStyle=diamond,motion=in)","Iris(irisStyle=diamond,motion=out)",
	"Checkerboard(squaresX=16,squaresY=16,direction=up)","Checkerboard(squaresX=16,squaresY=16,direction=left)","Blinds(bands=8,direction=up)","Blinds(bands=8,direction=left)",
	"RadialWipe(wipeStyle=clock)","RadialWipe(wipeStyle=wedge)","RadialWipe(wipeStyle=radial)","Spiral(GridSizeX=16,GridSizeY=16)","Zigzag(GridSizeX=16,GridSizeY=16)"
];

st_fl=[];	for(i=st_fl_id.length-1;i>=0;i--)	eval("st_fl['"+st_fl_id[i]+"']=i;");

function beginSTM(nam,type,pos_l,pos_t,flt,click_sh,click_hd,ver,hddelay,shdelay_h,shdelay_v,web_path,blank_src)
{
	if(!ver)		ver='300';
	if(hddelay==null)	hddelay='1000';
	if(shdelay_h==null)	shdelay_h='0';
	if(shdelay_v==null)	shdelay_v='250';
	if(!blank_src)	blank_src='blank.gif';
	eval("sdm_"+nam+"=st_cumei;");

	var pos=type;
	switch(type)
	{
	case "absolute":
		type="custom";break;
	case "custom":
	case "float":
		pos='absolute';break;
	case "relative":
		if(!eval(pos_l)&&!eval(pos_t))
		{
			pos='static';
			type='static';
		}
		break;
	case "static":
	default:
		type='static';pos='static';pos_l='0';pos_t='0';break;
	}
	if(web_path)
		blank_src=web_path+blank_src;
	else if(typeof(st_path)!='undefined')
		blank_src=st_path+blank_src;
	if(web_path==null)	web_path='';

	st_menus[st_cumei]=
	{
		bodys:		[],
		mei:		st_cumei,
		hdid:		null,

		block:		"STM"+st_cumei+"XX",
		nam:		nam,
		type:		type,
		pos:		pos,
		pos_l:		eval(pos_l),
		pos_t:		eval(pos_t),
		flt:		flt=='none' ? 'left' : flt,
		click_sh:	eval(click_sh),
		click_hd:	eval(click_hd),
		ver:		eval(ver),
		hddelay:	nNN4 ?  Math.max(100,eval(hddelay)) : eval(hddelay),
		shdelay_h:	eval(shdelay_h),
		shdelay_v:	eval(shdelay_v),
		web_path:	web_path,

		blank:		bufimg(blank_src),		
		clicked:	0
	};
}

function beginSTMB(offset,offset_l,offset_t,arrange,arrow,arrow_w,arrow_h,spacing,padding,bg_cl,bg_image,bg_rep,bd_cl,bd_sz,bd_st,trans,spec,spec_sp,lw_max,lh_max,rw_max,rh_max,bg_pos_x,bg_pos_y,ds_sz,ds_color,hdsp,bd_cl_t,bd_cl_r,bd_cl_b,ds_st)
{
	if(!ds_sz)		ds_sz=0;
	if(!ds_color)	ds_color='gray';
	if(!hdsp)		hdsp=0;
	if(!bd_cl_t)	bd_cl_t='';
	if(!bd_cl_r)	bd_cl_r='';
	if(!bd_cl_b)	bd_cl_b='';
	if(!ds_st)		ds_st='none';
	switch(bg_rep){case 'tile':case 'tiled':{bg_rep='repeat';}break;case 'free':bg_rep='no-repeat';break;case 'tiled by x':bg_rep='repeat-x';break;case 'tiled by y':bg_rep='repeat-y';break;default:break;}

	var oldmbi=st_cumbi;var olditi=st_cuiti;st_cumbi=st_menus[st_cumei].bodys.length;st_cuiti=0;
	var menu=st_menus[st_cumei];

	menu.bodys[st_cumbi]=
	{
		items:		[],

		mei:		st_cumei,
		mbi:		st_cumbi,
		block:		"STM"+st_cumei+"XX"+st_cumbi+"YY",
		par:		(st_cumbi ? [st_cumei,oldmbi,olditi] : null),
		tmid:		null,
		curiti:		-1,
		isshow:		0,
		isitem:		0,
		isstatic:	!st_cumbi&&menu.type=='static',
		isvisible:	!st_cumbi&&menu.type!='custom',
		isclick:	!st_cumbi&&menu.click_sh,
		exec_ed:	0,

		arrange:	arrange,
		offset:		offset,
		offset_l:	eval(offset_l),
		offset_t:	eval(offset_t),
		arrow:		getsrc(arrow,menu),
		arrow_w:	eval(arrow_w),
		arrow_h:	eval(arrow_h),
		spacing:	eval(spacing),
		padding:	eval(padding),
		bg_cl:		bg_cl,
		bg_image:	getsrc(bg_image,menu),
		bg_rep:		bg_rep,
		bd_st:		bd_st,
		bd_sz:		eval(bd_sz),
		bd_cl:		bd_cl,
		opacity:	100-eval(trans),
		spec:		spec,
		spec_sp:	eval(spec_sp),
		fl_type:	-1,
		lw_max:		eval(lw_max),
		lh_max:		eval(lh_max),
		rw_max:		eval(rw_max),
		rh_max:		eval(rh_max),
		ds_st:		ds_st,
		ds_sz:		ds_st!='none' ? eval(ds_sz) : 0,
		ds_color:	ds_color,
		hdsp:		eval(hdsp),

		spec_init:	0,
		spec_sh:	0,
		spec_hd:	0
	};
	var body=menu.bodys[st_cumbi];
	if(st_cumbi)	getpar(body).sub=[st_cumei,st_cumbi];
	body.z_index=	!st_cumbi ? 1000 : getpar(getpar(body)).z_index+10;
	if(body.offset=="auto")
	{
		if(st_cumbi)
			body.offset=getpar(getpar(body)).arrange=="vertically" ? "right" : "down";
		else
			body.offset= "down";
	}
	if(body.bd_st=="none")
		body.bd_sz=0;
	if(nSTMENU&&!nNN4&&bd_cl_t!="")
		body.bd_cl=(bd_cl_t+" "+bd_cl_r+" "+bd_cl_b+" "+bd_cl);
	bufimg(body.bg_image);
	body.background=getbg(body.bg_cl,body.bg_image,body.bg_rep);
	if(body.mbi&&!getpar(getpar(body)).bufed)
	{
		bufimg(getpar(getpar(body)).arrow);
		getpar(getpar(body)).bufed=1;
	}
	if(nIEW&&nVer<5.0&&nVer>=4.0&&body.isstatic)
		body.speceff='normal';
	else if(nIEW&&typeof(st_fl[spec])!='undefined'&&(nVer>=5.5||(nVer<5.5&&st_fl[spec]<=23)))
		body.speceff='filter';
	else if(nIEW&&spec=="Fade")
		body.speceff='fade';
	else
		body.speceff='normal';
	eval(body.speceff+'_init(body);');
}

function appendSTMI(isimage,text,align,valign,image_ou,image_ov,image_w,image_h,image_b,type,bgc_ou,bgc_ov,sep_img,sep_size,sep_w,sep_h,icon_ou,icon_ov,icon_w,icon_h,icon_b,tip,url,target,f_fm_ou,f_sz_ou,f_cl_ou,f_wg_ou,f_st_ou,f_de_ou,f_fm_ov,f_sz_ov,f_cl_ov,f_wg_ov,f_st_ov,f_de_ov,bd_sz,bd_st,bd_cl_r_ou,bd_cl_l_ou,bd_cl_r_ov,bd_cl_l_ov,bd_cl_t_ou,bd_cl_b_ou,bd_cl_t_ov,bd_cl_b_ov,st_text,bg_img_ou,bg_img_ov,bg_rep_ou,bg_rep_ov)
{
	if(!bd_cl_t_ou)	bd_cl_t_ou='';
	if(!bd_cl_b_ou)	bd_cl_b_ou='';
	if(!bd_cl_t_ov)	bd_cl_t_ov='';
	if(!bd_cl_b_ov)	bd_cl_b_ov='';
	if(!st_text)		st_text='';
	if(!bg_img_ou)		bg_img_ou='';
	if(!bg_img_ov)		bg_img_ov='';
	if(!bg_rep_ou)		bg_rep_ou='repeat';
	if(!bg_rep_ov)		bg_rep_ov='repeat';
	switch(bg_rep_ou){case 'tile':case 'tiled':bg_rep_ou='repeat';break;case 'free':bg_rep_ou='no-repeat';break;case 'tiled by x':bg_rep_ou='repeat-x';break;case 'tiled by y':bg_rep_ou='repeat-y';break;default:break;}
	switch(bg_rep_ov){case 'tile':case 'tiled':bg_rep_ov='repeat';break;case 'free':bg_rep_ov='no-repeat';break;case 'tiled by x':bg_rep_ov='repeat-x';break;case 'tiled by y':bg_rep_ov='repeat-y';break;default:break;}

	st_cuiti=st_menus[st_cumei].bodys[st_cumbi].items.length;
	var menu=st_menus[st_cumei];
	var body=menu.bodys[st_cumbi];
	body.items[st_cuiti]=
	{
		mei:		st_cumei,
		mbi:		st_cumbi,
		iti:		st_cuiti,
		block:		"STM"+st_cumei+"XX"+st_cumbi+"YY"+st_cuiti+"ZZ",
		sub:		null,
		isitem:		1,
		txblock:	"STM"+st_cumei+"XX"+st_cumbi+"YY"+st_cuiti+"ZZ"+"TX",
		tmid:		null,

		isimage:	eval(isimage),
		text:		text,
		align:		align,
		valign:		valign,
		image:		[getsrc(image_ou,menu),getsrc(image_ov,menu)],

		image_w:	eval(image_w),
		image_h:	eval(image_h),
		image_b:	eval(image_b),
		type:		type,
		bg_cl:		[bgc_ou,bgc_ov],
		sep_img:	getsrc(sep_img,menu),
		sep_size:	eval(sep_size),
		sep_w:		eval(sep_w),
		sep_h:		eval(sep_h),
		icon:		[getsrc(icon_ou,menu),getsrc(icon_ov,menu)],
		icon_w:		eval(icon_w),
		icon_h:		eval(icon_h),
		icon_b:		eval(icon_b),
		tip:		tip,
		url:		url,
		target:		target=="" ? "_self" : target,
		f_fm:		[f_fm_ou.replace(/'/g,''),f_fm_ov.replace(/'/g,'')],
		f_sz:		[f_sz_ou,f_sz_ov],
		f_cl:		[f_cl_ou,f_cl_ov],
		f_wg:		[f_wg_ou,f_wg_ov],
		f_st:		[f_st_ou,f_st_ov],
		f_de:		[f_de_ou,f_de_ov],
	
		bd_st:		bd_st,
		bd_sz:		eval(bd_sz),
		bd_cl_r:	[bd_cl_r_ou,bd_cl_r_ov],
		bd_cl_l:	[bd_cl_l_ou,bd_cl_l_ov],
		bd_cl_t:	[bd_cl_t_ou,bd_cl_t_ov],
		bd_cl_b:	[bd_cl_b_ou,bd_cl_b_ov],

		st_text:	st_text,
		bg_img:		[getsrc(bg_img_ou,menu),getsrc(bg_img_ov,menu)],
		bg_rep:		[bg_rep_ou,bg_rep_ov]
	};

	var item=st_menus[st_cumei].bodys[st_cumbi].items[st_cuiti];
	if(item.bd_st=="none"||!item.bd_sz)
	{
		item.bd_sz=0;	item.bd_st="none";
	}
	if(nOP)
	{
		if(item.bd_st=="ridge")		item.bd_st="outset";
		if(item.bd_st=="groove")	item.bd_st="inset";
	}
	if(item.bd_st=="inset")
	{
		var tmclr=item.bd_cl_l;	item.bd_cl_l=item.bd_cl_r;	item.bd_cl_r=tmclr;	item.bd_st="outset";
	}
	if(bd_cl_t_ou=="")
	{
		if("none_solid_double_dashed_dotted".indexOf(item.bd_st)>=0)
			item.bd_cl_r=item.bd_cl_l;
		if(item.bd_st=="outset")
			item.bd_st="solid";
		item.bd_cl_t=item.bd_cl_l;
		item.bd_cl_b=item.bd_cl_r;
	}
	item.bd_cl=[];
	for(i=0;i<2;i++)
		item.bd_cl[i]=item.bd_cl_t[i]+" "+item.bd_cl_r[i]+" "+item.bd_cl_b[i]+" "+item.bd_cl_l[i];
	if(item.type=="sepline")
		bufimg(item.sep_img);
	else
	{
		for(i=0;i<2;i++)
		{
			bufimg(item.icon[i]);
			if(item.isimage)
				bufimg(item.image[i]);
			bufimg(item.bg_img[i]);
		}
	}
	item.background=[getbg(item.bg_cl[0],item.type=='sepline' ? '' : item.bg_img[0],item.bg_rep[0]),getbg(item.bg_cl[1],item.bg_img[1],item.bg_rep[1])];
}

function endSTMB()
{
	var item=getpar(st_menus[st_cumei].bodys[st_cumbi]);
	if(item)
	{
		st_cumei=item.mei;
		st_cumbi=item.mbi;
		st_cuiti=item.iti;
	}
}

function endSTM()
{
	var menu=st_menus[st_cumei];
	var menuHTML="";
	var menuCSS="<STYLE TYPE='text/css'>\r\n";
	
	var max_l=nSTMENU ? menu.bodys.length : 1;
	for(mbi=0;mbi<max_l;mbi++)
	{
		var body=menu.bodys[mbi];
		var bodyHTML=getBodyTextH(body);
		if(body.isstatic)
			bodyHTML="<TABLE STYLE='border:none;padding:0px;' CELLPADDING=0 CELLSPACING=0"+(menu.flt=='left' ? "" : " align="+menu.flt)+"><TD class=st_tdcss>"+bodyHTML;
		for(iti=0;iti<body.items.length;iti++)
		{
			var item=body.items[iti];
			var itemHTML="";
			itemHTML+=body.arrange=="vertically" ? "<TR ID="+item.block+"TR>" : "";
			itemHTML+=getItemText(item);
			itemHTML+=(body.arrange=="vertically" ? "</TR>" : "");
			bodyHTML+=itemHTML;
			if(item.type!='sepline')
			{
				menuCSS+="."+item.block+"TX0\r\n{\r\n"+getTextCSS(item,0)+"\r\n}\r\n";
				menuCSS+="."+item.block+"TX1\r\n{\r\n"+getTextCSS(item,1)+"\r\n}\r\n";
			}
		}
		bodyHTML+=getBodyTextE(body);
		if(body.isstatic)
			bodyHTML+="</TD></TABLE>";

		if(body.isstatic||nNN4||!nSTMENU)
			menuHTML+=bodyHTML;
		else
			st_ht+=bodyHTML;
	}
	menuCSS+="</STYLE>";
	if(!nSTMENU||nNN4)
		document.write(menuCSS);
	if(menuHTML!='')
		document.write(menuHTML);
	if(nSTMENU&&!(nIEM||(nIEW&&nVer<5.0)))
	{
		if(st_ht!='')
		{
			var obj=getob('st_global'+st_gcount,'font');
			if(nNN6)
				obj.innerHTML=st_ht;
			else if(nIE&&nVer>=5.0)
				obj.insertAdjacentHTML("BeforeEnd",st_ht);
			else
				obj.document.write(st_ht);
			st_gcount++;
			st_ht='';
		}
		if(!nOP&&!nNN4)
			prefix(menu);
	}
	st_cumei++;st_cumbi=0;st_cuiti=0;
}

function getBodyTextH(body)
{
	var s="";
	if(nNN4||!nSTMENU)
	{
		s+=body.isstatic ? "<ILAYER" : "<LAYER";
		s+=" VISIBILITY=hide";
		s+=" ID="+body.block;
		s+=" Z-INDEX="+body.z_index;
		s+="><LAYER>";
		s+="<TABLE BORDER=0 CELLSPACING=0 CELLPADDING="+body.spacing;
		if(body.bg_image!="")
			s+=" BACKGROUND=\""+body.bg_image+"\"";
		if(body.bg_cl!="transparent")
			s+=" BGCOLOR="+body.bg_cl;
		s+=" ID="+body.block;
		s+=">";
	}
	else
	{
		var stdiv="position:"+(body.mbi ? 'absolute' : getme(body).pos)+";";
		stdiv+="z-index:"+body.z_index+";";
		stdiv+="visibility:hidden;";

		s+=nTopTb ? "<TABLE class=st_tbcss CELLPADDING=0 CELLSPACING=0" : "<DIV class=st_divcss";
		s+=getBodyEventString(body);
		s+=" ID="+body.block;
		s+=" STYLE='";
		if(nIEM)
			s+="width:1px;";
		else if(nIE)
			s+="width:0px;";
		s+=getFilterCSS(body);
		s+=stdiv;
		s+="'>";
		if(nTopTb)
			s+="<TD class=st_tdcss ID="+body.block+"TTD>";
		s+="<TABLE class=st_tbcss CELLSPACING=0 CELLPADDING=0";
		s+=" ID="+body.block+"TB";
		s+=" STYLE='";
		s+=getBodyCSS(body);
		if(!nOP)
			s+="margin:"+body.ds_sz+"px;";
		s+="'>";
	}
	return s;
}

function getBodyTextE(body)
{
	var s="</TABLE>";
	if(nNN4||!nSTMENU)
		s+="</LAYER></LAYER>";
	else if(nTopTb)
		s+="</TD></TABLE>";
	else
		s+="</DIV>";
	return s;
}

function getItemText(item)
{
	var s="";
	if(nNN4||!nSTMENU)
	{
		var max_i=nNN4 ? 2 : 1;
		s+="<TD WIDTH=1 NOWRAP>"
		s+="<FONT STYLE='font-size:1pt;'>";
		s+="<ILAYER ID="+item.block+"><LAYER";
		if(item.bd_sz&&item.type!="sepline")
			s+=" BGCOLOR="+item.bd_cl_l[0];
		s+=">";

		for(i=0;i<max_i;i++)
		{
			if(item.type=="sepline"&&i)
				break;
			s+="<LAYER Z-INDEX=10 VISIBILITY="+(i ? "HIDE" : "SHOW");
			if(item.type!="sepline")
				s+=" LEFT="+item.bd_sz+" TOP="+item.bd_sz;
			s+=">";

			s+="<TABLE ALIGN=LEFT WIDTH=100% BORDER=0 CELLSPACING=0 CELLPADDING="+(item.type=="sepline" ? 0 : getpar(item).padding);
			if(item.bg_img[i]!="")
				s+=" BACKGROUND=\""+item.bg_img[i]+"\"";
			if(item.bg_cl[i]!="transparent")
				s+=" BGCOLOR="+item.bg_cl[i];
			s+=">";

			if(item.type=="sepline")
			{
				s+="<TD NOWRAP VALIGN=TOP"+
					" HEIGHT="+(getpar(item).arrange=="vertically" ? item.sep_size : "100%")+
					" WIDTH="+(getpar(item).arrange=="vertically" ? "100%" : item.sep_size)+
					" STYLE='font-size:0pt;'"+
					">";
				s+=createIMG(item.sep_img,item.block+"LINE",item.sep_w,item.sep_h,0);
				s+="</TD>";
			}
			else
			{
				if(getpar(item).lw_max&&(getpar(item).arrange=="vertically"||item.icon_w))
				{
					s+="<TD ALIGN=CENTER VALIGN=MIDDLE";
					s+=getwdstr(item);
					s+=">";
					s+=createIMG(item.icon[i],item.block+"ICON",item.icon_w,item.icon_h,item.icon_b);
					s+="</TD>";
				}

				s+="<TD WIDTH=100% NOWRAP ALIGN="+item.align+" VALIGN="+item.valign+">";
				s+="<A "+getURL(item)+" CLASS='"+item.block+"TX"+i+"'>";
				if(item.isimage)
					s+=createIMG(item.image[i],item.block+"IMG",item.image_w,item.image_h,item.image_b);
				else
				{
					s+="<IMG SRC=\""+getme(item).blank.src+"\" WIDTH=1 HEIGHT=1 BORDER=0 ALIGN=ABSMIDDLE>";
					s+=item.text;
				}
				s+="</A>";
				s+="</TD>";

				if(getpar(item).arrow_w)
				{
					s+="<TD NOWRAP ALIGN=CENTER VALIGN=MIDDLE>";
					s+=createIMG((getsub(item) ? getpar(item).arrow : getme(item).blank.src),item.block+"ARROW",getpar(item).arrow_w,getpar(item).arrow_h,0);
					s+="</TD>";
				}
			}

			s+="</TABLE>";
			if(item.bd_sz&&item.type!="sepline")
				s+="<BR CLEAR=ALL><SPACER HEIGHT=1 WIDTH="+item.bd_sz+"></SPACER><SPACER WIDTH=1 HEIGHT="+item.bd_sz+"></SPACER>";
			s+="</LAYER>";
		}
		if(item.type!="sepline")
			s+="<LAYER Z-INDEX=20></LAYER>";

		s+="</LAYER></ILAYER>"
		s+="</FONT>";
		s+="</TD>";
	}
	else
	{
		s+="<TD class=st_tdcss NOWRAP VALIGN="+(nIE ? "MIDDLE" : "TOP");
		s+=" STYLE='"
			s+="padding:"+getpar(item).spacing+"px;";
		s+="'";
		s+=" ID="+getpar(item).block+item.iti;
		if(nIEW)
			s+=" HEIGHT=100%";
		s+=">";
		if(!nOP&&!nIE)
		{
			s+="<DIV class=st_divcss ID="+item.block;
			s+=getItemEventString(item);
			s+=" STYLE=\""+getItemCSS(item,0);
			s+="\"";
			s+=">";
		}
		s+="<TABLE class=st_tbcss CELLSPACING=0 CELLPADDING=0";
		if(!nOP)
			s+=" HEIGHT=100%";

		s+=" STYLE=\"";
		if(nOP||nIE)
			s+=getItemCSS(item,0);
		s+="\"";
		if(nOP||nIE)
			s+=getItemEventString(item);
		if(getpar(item).arrange=="vertically"||nIEM)
			s+=" WIDTH=100%";
		s+=" ID="+(nOP||nIE ? item.block : (item.block+"TB"));
		if(!nOP)
			s+=" TITLE="+addquo(item.type!="sepline" ? item.tip : "");
		s+=">";

		if(item.type=="sepline")
		{
			s+="<TD class=st_tdcss  NOWRAP VALIGN=TOP"+
				" ID="+item.block+"MTD"+
				" HEIGHT="+(getpar(item).arrange=="vertically" ? item.sep_size : "100%")+
				" WIDTH="+(getpar(item).arrange=="vertically" ? "100%" : item.sep_size)+
				">";
			s+=createIMG(item.sep_img,item.block+"LINE",item.sep_w,item.sep_h,0);
			s+="</TD>";
		}
		else
		{
			if(getpar(item).lw_max&&(getpar(item).arrange=="vertically"||item.icon_w))
			{
				s+="<TD class=st_tdcss NOWRAP ALIGN=CENTER VALIGN=MIDDLE HEIGHT=100%";
				s+=" STYLE=\"padding:"+getpar(item).padding+"px\"";
				s+=" ID="+item.block+"LTD";
				s+=getwdstr(item);
				s+=">";
				s+=createIMG(item.icon[0],item.block+"ICON",item.icon_w,item.icon_h,item.icon_b);
				s+="</TD>";
			}
			else if(getpar(item).arrange=="vertically")
			{
				s+="<TD class=st_tdcss";
				s+=" STYLE=\"padding:"+getpar(item).padding+"px\"";
				s+=" ID="+item.block+"LLTD WIDTH=3><IMG SRC=\""+getme(item).blank.src+"\" WIDTH=1 ID="+item.block+"LLTDI></TD>";
			}

			s+="<TD class=st_tdcss NOWRAP HEIGHT=100% STYLE=\"color:"+item.f_cl[0]+";";
			s+="padding:"+getpar(item).padding+"px;";
			s+="\"";
			s+=" ID="+item.block+"MTD";
			s+=" ALIGN="+item.align;
			s+=" VALIGN="+item.valign+">";
			s+="<FONT class=st_ftcss ID="+item.txblock+" STYLE=\""+getTextCSS(item,0)+"\">";
			if(item.isimage)
				s+=createIMG(item.image[0],item.block+"IMG",item.image_w,item.image_h,item.image_b);
			else
				s+=item.text;
			s+="</FONT>";
			s+="</TD>";

			if(getpar(item).arrow_w)
			{
				s+="<TD class=st_tdcss NOWRAP";
				s+=" STYLE=\"padding:"+getpar(item).padding+"px\"";
				s+=" ID="+item.block+"RTD";
				s+=" WIDTH="+(getpar(item).arrow_w+2);
				s+=" ALIGN=CENTER VALIGN=MIDDLE HEIGHT=100%>";
				s+=createIMG((getsub(item) ? getpar(item).arrow : getme(item).blank.src),item.block+"ARROW",getpar(item).arrow_w,getpar(item).arrow_h,0);
				s+="</TD>";
			}
			else if(getpar(item).arrange=="vertically")
			{
				s+="<TD class=st_tdcss";
				s+=" STYLE=\"padding:"+getpar(item).padding+"px\"";
				s+=" ID="+item.block+"RRTD WIDTH=3><IMG SRC=\""+getme(item).blank.src+"\" WIDTH=1 ID="+item.block+"RRTDI></TD>";
			}
		}
		
		s+="</TABLE>";
		if(!nOP&&!nIE)
			s+="</DIV>";
		s+="</TD>";
	}
	return s;
}

function getBodyCSS(body)
{
	var s="";
	s+="border-style:"+body.bd_st+";";
	s+="border-width:"+body.bd_sz+"px;";
	s+="border-color:"+body.bd_cl+";";
	if(nIE)
		s+="background:"+body.background+";";
	else
	{
		s+="background-color:"+(body.bg_cl)+";";
		if(body.bg_image!="")
		{
			s+="background-image:url("+body.bg_image+");";
			s+="background-repeat:"+body.bg_rep+";";
		}
	}
	return s;
}

function getFilterCSS(body)
{
	var s="";
	var dxpre="progid:DXImageTransform.Microsoft.";
	if(nIEW&&(nVer>=5.0||!body.isstatic))
	{
		s+="filter:";
		if(typeof(body.spec_string)!='undefined')
			s+=body.spec_string;

		s+=" ";
		if(nVer>=5.5)
			s+=dxpre;
		s+="Alpha(opacity="+body.opacity+")";

		if(body.ds_sz!=0)
		{
			s+=" ";
			if(nVer>=5.5)
				s+=dxpre;
			if(body.ds_st=="simple")
				s+="dropshadow(color="+body.ds_color+",offx="+body.ds_sz+",offy="+body.ds_sz+",positive=1) ";
			else
				s+="Shadow(color="+body.ds_color+",direction=135,strength="+body.ds_sz+") ";
		}
		s+=";";
	}
	return s;
}

function getItemCSS(item,its)
{
	var s="";
	if(item.type!="sepline")
	{
		s+="border-style:"+item.bd_st+";";
		s+="border-width:"+item.bd_sz+"px;";
		s+="border-color:"+item.bd_cl[its]+";";
		
		if(!nIE&&item.bg_img[its]!="")
		{
			s+="background-image:url("+item.bg_img[its]+");";
			s+="background-repeat:"+item.bg_rep[its]+";";
		}
	}
	if(nIE)
		s+="background:"+item.background[its]+";";
	else
		s+="background-color:"+item.bg_cl[its]+";";
	s+="cursor:"+getcursor(item)+";";
	return s;
}

function getTextCSS(item,its)
{
	var s="";
	s+="cursor:"+getcursor(item)+";";
	s+="font-family:"+item.f_fm[its]+";";
	s+="font-size:"+item.f_sz[its]+";";
	s+="font-weight:"+item.f_wg[its]+";";
	s+="font-style:"+item.f_st[its]+";";
	s+="text-decoration:"+item.f_de[its]+";";
	if(!nSTMENU||nNN4)
		s+="color:"+item.f_cl[its];
	return s;
}

function doitov(e,obj,it)
{
	if(nIEW)
	{
		if(!it.layer)
			it.layer=obj;
		if(!getpar(it).isshow||(e.fromElement&&obj.contains(e.fromElement)))
			return;
	}
	else
	{
		if(!getpar(it).isshow||(!nNN&&(e.fromElement&&e.fromElement.id&&e.fromElement.id.indexOf(it.block)>=0)))
			return ;
	}
	if(nNN4)
		getlayer(it).document.layers[0].captureEvents(Event.CLICK);
	
	if(typeof(onitov)=="function")
		onitov(it.mei,it.mbi,it.iti);

	if(getme(it).hdid)
	{
		clearTimeout(getme(it).hdid);
		getme(it).hdid=null;
	}

	var curiti=getpar(it).curiti;
	var curit=null;
	if(curiti>=0)
		curit=getpar(it).items[curiti];

	if(!getpar(it).isclick||getme(it).clicked)
	{
		if(getpar(it).curiti!=it.iti)
		{
			if(getpar(it).curiti>=0)
			{
				hditpop(getpar(it).items[getpar(it).curiti]);
				getpar(it).curiti=-1;
			}
			shitpop(it);
			getpar(it).curiti=it.iti;
		}
		else
		{
			if(getsub(it)&&!getsub(it).isshow)
			{
				shitst(it,1);
				showpop(getsub(it));
			}
		}
	}
	if(it.st_text!="")
		window.status=it.st_text;
}

function doitou(e,obj,it)
{
	if(nIEW)
	{
		if(!getpar(it).isshow||e.toElement&&obj.contains(e.toElement))
			return;
	}
	else
	{
		if(!getpar(it).isshow||(!nNN&&(e.toElement&&e.toElement.id&&e.toElement.id.indexOf(it.block)>=0)))
			return ;
	}
	if(nNN4)
		getlayer(it).document.layers[0].releaseEvents(Event.CLICK);
	
	if(typeof(onitou)=="function")
		onitou(it.mei,it.mbi,it.iti);

	if(!getsub(it)||!getsub(it).isshow)
	{
		shitst(it,0);
		getpar(it).curiti=-1;
	}
	else if(getsub(it)&&getsub(it).isshow&&!getsub(it).exec_ed)
		hditpop(it);
	window.status="";
}

function doitck(e,obj,it)
{
	if(e.button&&e.button>=2)
		return;
	if(getpar(it).isclick)
	{
		getme(it).clicked=!getme(it).clicked;
		if(getme(it).clicked)
		{
			shitpop(it);
			getpar(it).curiti=it.iti;
		}
		else
		{
			hditpop(it);
			getpar(it).curiti=-1;
		}
	}
	if(!nNN4&&!(getpar(it).isclick&&getsub(it))&&it.url!="")
	{
		if(it.url.toLowerCase().indexOf("javascript:")==0)
			eval(it.url.substring(11,it.url.length));
		else if(it.target=="_self")
			window.location.href=it.url;
		else if(it.target=="_parent")
			window.parent.location.href=it.url;
		else if(it.target=="_top")
			window.top.location.href=it.url;
		else
		{
  			for(var _curobj=window;_curobj!=_curobj.parent;_curobj=_curobj.parent)
  			{
  				if(typeof(_curobj.parent.frames[it.target])!="undefined")
  				{
  					_curobj.parent.frames[it.target].location.href=it.url;
					return;
  				}
  			}
			window.open(it.url,it.target);
		}
	}
}

function getrect(mbit)
{
	if(nNN4)
	{
		var obj=getlayer(mbit);
		return [obj.pageX,obj.pageY,obj.clip.width,obj.clip.height];
	}
	else
	{
		var l=0,t=0;
		var obj=getlayer(mbit);
		var w=parseInt(nOP ? obj.style.pixelWidth : obj.offsetWidth);
		var h=parseInt(nOP ? obj.style.pixelHeight : obj.offsetHeight);
		if(!nOP&&!nIEM&&typeof(mbit.iti)=='undefined')
			h-=mbit.ds_sz*2;
		while(obj)
		{
			l+=parseInt(obj.offsetLeft);
			t+=parseInt(obj.offsetTop);
			obj=obj.offsetParent;
		}
		if(nIEM)
		{
			l+=parseInt(document.body.leftMargin);
			l-=mbit.bd_sz;
			t-=mbit.bd_sz;
		}
		if(typeof(mbit.iti)!='undefined')
		{
			if(bDelBorder)
			{
				l-=mbit.bd_sz;
				t-=mbit.bd_sz;
			}
			if(bAddBorder)
			{
				l+=getpar(mbit).bd_sz;
				t+=getpar(mbit).bd_sz;
			}
		}
		return [l,t,w,h];
	}
}

function getxy(body)
{
	var x=body.offset_l;
	var y=body.offset_t;
	var subrc=getrect(body);
	body.rc=subrc;
	if(body.mbi==0)
	{
		if(getme(body).type=="custom")
			return [getme(body).pos_l,getme(body).pos_t];
		else if(getme(body).type=="float")
			return [getcl()+getme(body).pos_l,getct()+getme(body).pos_t];
		else
			return [subrc[0],subrc[1]];
	}
	var itrc=getrect(getpar(body));
	var bdrc=getrect(getpar(getpar(body)));
	switch(body.offset)
	{
		case "left":
			x+=itrc[0]-subrc[2];
			y+=itrc[1];
			break;
		case "up":
			x+=itrc[0];
			y+=itrc[1]-subrc[3];
			if(nIEM)
				y+=body.ds_sz;
			break;
		case "right":
			x+=itrc[0]+itrc[2];
			y+=itrc[1];
			break;
		case "down":
			x+=itrc[0];
			y+=itrc[1]+itrc[3];
			break;
		case "auto":
		default:
			break;
	}
	if(!nOP&&!nNN4)
	{
		x-=body.ds_sz;
		y-=body.ds_sz;
	}
	return adjust([x,y],body);
}

function adjust(xy,body)
{
	var rc=getrect(body);
	var tx=xy[0];
	var ty=xy[1];
	var c_l=getcl();
	var c_t=getct();
	var c_r=c_l+getcw();
	var c_b=c_t+getch();
	if(tx+rc[2]>c_r)
		tx=c_r-rc[2];
	tx=tx>c_l ? tx : c_l;
	if(ty+rc[3]>c_b)
		ty=c_b-rc[3];
	ty=ty>c_t ? ty : c_t;
	return [tx,ty];
}

function ckPage()
{
	var st_or_w=st_cl_w;
	var st_or_h=st_cl_h;
	var st_or_l=st_cl_l;
	var st_or_t=st_cl_t;
	st_cl_w=getcw();
	st_cl_h=getch();
	st_cl_l=getcl();
	st_cl_t=getct();
	if((nOP||nNN4)&&(st_cl_w-st_or_w||st_cl_h-st_or_h))
		document.location.reload();
	else if(st_cl_l-st_or_l||st_cl_t-st_or_t)
		setTimeout("scrollmenu();",500);
}

function shitst(it,nst)
{
	if(nNN4)
	{
		var st_lay=get_st_lay(it);
		st_lay[nst].parentLayer.bgColor=it.bd_cl_l[nst];
		st_lay[nst].visibility="show";
		st_lay[1-nst].visibility="hide";
	}
	else
	{
		var objs=getlayer(it).style;
		
		if(nIE&&nMac)
		{
			if(it.background[0]!=it.background[1])	objs.background=it.background[nst];
		}
		else
		{
			if(nOP)
				objs.background=it.bg_cl[nst];
			else
			{
				if(it.bg_cl[0]!=it.bg_cl[1])	objs.backgroundColor=it.bg_cl[nst];
			}
			if(it.bg_img[nst]!="")
			{
				if(it.bg_img[0]!=it.bg_img[1])	objs.backgroundImage="url("+it.bg_img[nst]+")";
				if(it.bg_rep[0]!=it.bg_rep[1])	objs.backgroundRepeat=it.bg_rep[nst];
			}
		}

		if(it.bd_cl[0]!=it.bd_cl[1])	objs.borderColor=it.bd_cl[nst];

		var tmp;
		if(it.icon[0]!=it.icon[1])
		{
			tmp=getob(it.block+'ICON','IMG');
			if(tmp)	tmp.src=it.icon[nst];
		}
		if(it.isimage&&it.image[0]!=it.image[1])
		{
			tmp=getob(it.block+'IMG','IMG');
			if(tmp)	tmp.src=it.image[nst];
		}

		if (!it.txstyle)	it.txstyle=getob(it.txblock,'font').style;
		tmp=it.txstyle;
		if(it.f_fm[0]!=it.f_fm[1])	tmp.fontFamily=it.f_fm[nst];
		if(it.f_sz[0]!=it.f_sz[1])	tmp.fontSize=it.f_sz[nst];
		if(it.f_wg[0]!=it.f_wg[1])	tmp.fontWeight=it.f_wg[nst];
		if(it.f_st[0]!=it.f_st[1])	tmp.fontStyle=it.f_st[nst];
		if(it.f_de[0]!=it.f_de[1])	tmp.textDecoration=it.f_de[nst];
		if(it.f_cl[0]!=it.f_cl[1])
		{
			if(nOP)	getob(it.block+'MTD','td').style.color=it.f_cl[nst];
			else	tmp.color=it.f_cl[nst];
		}
	}
}

function dombov(e,obj,mb)
{
	if(nIEW)
	{
		if(!mb.layer)
			mb.layer=obj;
		if(!mb.isshow||(e.fromElement&&obj.contains(e.fromElement)))
			return;
	}
	else
	{
		if(!mb.isshow||(!nNN&&(e.fromElement&&e.fromElement.id&&e.fromElement.id.indexOf(mb.block)>=0)))
			return ;
	}

	if(getme(mb).hdid)
	{
		clearTimeout(getme(mb).hdid);
		getme(mb).hdid=null;
	}
}

function dombou(e,obj,mb)
{
	if(nIEW)
	{
		if(!mb.isshow||(e.toElement&&obj.contains(e.toElement)))
			return;
	}
	else
	{
		if(!mb.isshow||(!nNN&&(e.toElement&&e.toElement.id&&e.toElement.id.indexOf(mb.block)>=0)))
			return ;
	}

	if(getme(mb).hdid)
	{
		clearTimeout(getme(mb).hdid);
		getme(mb).hdid=null;
	}
	getme(mb).hdid=setTimeout("hideall(st_menus['"+mb.mei+"']);",getme(mb).hddelay);
}

function showpop(body)
{
	show(body);
}

function hidepop(body)
{
	if(body.curiti>=0)
	{
		var tmp=getsub(body.items[body.curiti]);
		if(tmp&&tmp.isshow)
			hidepop(tmp);
		shitst(body.items[body.curiti],0);
		body.curiti=-1;
	}
	hide(body);
}

function shitpop(item)
{
	if(getsub(item))
	{
		if(!getsub(item).isshow)
			showpop(getsub(item));
	}
	shitst(item,1);
}

function hditpop(item)
{
	if(getsub(item)&&getsub(item).isshow)
		hidepop(getsub(item));
	shitst(item,0);
}

function hideall(menu)
{
	menu.clicked=0;
	var body=menu.bodys[0];
	if(body.isshow)
	{
		if(body.curiti>=0)
		{
			hditpop(body.items[body.curiti]);
			body.curiti=-1;
		}
		if(menu.type=="custom")
			hide(body);
	}
	menu.hdid=null;
}

function bufimg(sr)
{
	if(sr!="")
	{
		st_buf[st_buf.length]=new Image();
		st_buf[st_buf.length-1].src=sr;
		return st_buf[st_buf.length-1];
	}
	return null;
}

function normal_init(body)
{
}

function normal_sh(body)
{
	moveto(getxy(body),body);
	ck_win_els(-1,body);
	_sh(body);
}

function normal_hd(body)
{
	_hd(body);
	ck_win_els(+1,body);
}

function fade_init(body)
{
	body.current=0;
	body.step=parseInt(body.opacity*10/(110-body.spec_sp));
	if(body.step<=0)
		body.step=1;
}

function fade_sh(body)
{
	if(body.exec_ed)
	{
		body.current+=body.step;
		if(body.current>body.opacity)
			body.current=body.opacity;
	}
	getlayer(body).filters["Alpha"].opacity=body.current;
	if(!body.exec_ed)
	{
		moveto(getxy(body),body);
		ck_win_els(-1,body);
		_sh(body);
	}
	if(body.current!=body.opacity)
		body.tmid=setTimeout(get_sdstr(body,1),100);
}

function fade_hd(body)
{
	if(body.exec_ed)
	{
		body.current-=body.step;
		if(body.current<0||!body.hdsp)
			body.current=0;
	}
	getlayer(body).filters["Alpha"].opacity=body.current;
	if(!body.current)
	{
		_hd(body);
		ck_win_els(+1,body);
	}
	else
		body.tmid=setTimeout(get_sdstr(body,0),100);
}

function filter_init(body)
{
	body.fl_type=st_fl[body.spec];
	if(body.fl_type==23)
		body.fl_type=parseInt(23*Math.random());
	body.spec_sp=(body.spec_sp>100 ? 100 : (body.spec_sp<=10 ? 10 : body.spec_sp));
	body.duration=10/body.spec_sp;
	if(nVer<5.5)
		body.spec_string=" revealTrans(Transition="+body.fl_type+",Duration="+body.duration+")";
	else
	{
		body.spec_string=" progid:DXImageTransform.Microsoft."+st_fl_string[body.fl_type];
		body.spec_string=body.spec_string.replace(')',',Duration='+body.duration+')');
	}
}

function filter_sh(body)
{
	if(nVer<5.5)
		ft_shx(body);
	else if(bFtReg)
		eval("try{ft_shx(body);} catch(_err){bFtReg=0;normal_sh(body);}");
	else
		normal_sh(body);
}

function filter_hd(body)
{
	if(nVer<5.5)
		ft_hdx(body);
	else if(bFtReg)
		eval("try{ft_hdx(body);}catch(_err){bFtReg=0;normal_hd(body);}");
	else
		normal_hd(body);
}

function ft_shx(body)
{
	var fl_obj=getlayer(body).filters[0];
	if(fl_obj.Status!=0)
		fl_obj.stop();
	moveto(getxy(body),body);
	ck_win_els(-1,body);
	fl_obj.apply();
	_sh(body);
	fl_obj.play();
}

function ft_hdx(body)
{
	var fl_obj=getlayer(body).filters[0];
	if(fl_obj.Status!=0)
		fl_obj.stop();
	if(body.hdsp)	fl_obj.apply();
	_hd(body);
	ck_win_els(+1,body);
	if(body.hdsp)	fl_obj.play();
}

function showFloatMenuAt(nam,x,y)
{
	if(nSTMENU)
	{
		var menu=getMenuByName(nam);
		if(menu&&typeof(menu.ready)!="undefined"&&menu.type=="custom"&&menu.bodys.length&&!menu.bodys[0].isshow)
		{
			movetoex(menu,[x,y]);
			show(menu.bodys[0]);
		}
	}
}

function hideMenu(nam)
{
	hideall(getMenuByName(nam));
}

function getMenuByName(nam)
{
	return st_menus[eval("sdm_"+nam)];
}


function movetoex(menu,xy)
{
	menu.pos_l=xy[0];
	menu.pos_t=xy[1];
}

function getcursor(it)
{
	if(nNN6)
		return "default";
	return it.type!="sepline"&&((it.mbi==0&&getme(it).click_sh&&getsub(it))||it.url!="") ? "hand" : "default";
}

function getwdstr(obj)
{
	if(getpar(obj).arrange=="vertically")
	{
		if(getpar(obj).lw_max>0)
			return " WIDTH="+getpar(obj).lw_max;
		else
			return "";
	}
	else
	{
		if(obj.icon_w>0)
			return " WIDTH="+obj.icon_w;
		else
			return "";
	}
}

function detectNav()
{
	var naVer=navigator.appVersion;
	var naAgn=navigator.userAgent;
	nMac=naVer.indexOf("Mac")>=0;
	nOP=naAgn.indexOf("Opera")>=0;
	if(nOP)
	{
		nVer=parseFloat(naAgn.substring(naAgn.indexOf("Opera ")+6,naAgn.length));
		nOP5=nVer>=5.12&&!nMac&&naAgn.indexOf("MSIE 5.0")>=0;
	}
	else
	{
		nIE=document.all ? 1 : 0;
		if(nIE)
		{
			nIE4=(eval(naVer.substring(0,1)>=4));
			nVer=parseFloat(naAgn.substring(naAgn.indexOf("MSIE ")+5,naAgn.length));
			nIE5=nVer>=5.0&&nVer<5.5;
			nIEM=nIE4&&nMac;
			nIEW=nIE4&&!nMac;
		}
		else
		{
			nNN4=navigator.appName.toLowerCase()=="netscape"&&naVer.substring(0,1)=="4" ? 1 : 0;
			if(!nNN4)
			{
				nNN6=(document.getElementsByTagName("*") && naAgn.indexOf("Gecko")!=-1);
				if(nNN6)
				{
					nVer=parseInt(navigator.productSub);
					if(naAgn.indexOf("Netscape")>=0)
					{
						bDelBorder=nVer<20001108+1;
						bAddBorder=nVer>20020512-1;
					}
					else
					{
						bDelBorder=nVer<20010628+1;
						bAddBorder=nVer>20011221-1;
					}
				}
			}
			else
				nVer=parseFloat(naVer);
			nNN=nNN4||nNN6;
		}
	}
	nSTMENU=nOP5||nIE4||nNN;
}

function st_onload()
{
	if(nIEM||nOP5||nNN4||(nIEW&&nVer<5.0))
	{
		if(st_ht!='')
			document.body.insertAdjacentHTML('BeforeEnd',st_ht);
		for(i=0;i<st_menus.length;i++)
			prefix(st_menus[i]);
	}
	st_loaded=1;
	if(!nNN4)
	{
		for(i=0;i<st_menus.length;i++)
		{
			var menu=st_menus[i];
			var curit=null;
			for(body=menu.bodys[0];body&&body.isshow&&body.exec_ed;body=(curit&&getsub(curit) ? getsub(curit) : null))
			{
				ck_win_els(-1,body);
				curit=body.curiti>=0 ? body.items[body.curiti] : null;
			}
		}
	}
}

function getpar(mbit)
{
	if(mbit.isitem)
		return st_menus[mbit.mei].bodys[mbit.mbi];
	else
		return !mbit.par ? null : st_menus[mbit.par[0]].bodys[mbit.par[1]].items[mbit.par[2]];
}

function getsub(item)
{
	return !item.sub ? null : st_menus[item.sub[0]].bodys[item.sub[1]];
}

function getme(mbit)
{
	return st_menus[mbit.mei];
}

function getsrc(sr,me)
{
	if(sr=='')
		return '';
	var _sr=sr.toLowerCase();
	if(_sr.indexOf('http://')==0||(_sr.indexOf(':')==1&&_sr.charCodeAt(0)>96&&_sr.charCodeAt(0)<123)||_sr.indexOf('ftp://')==0||_sr.indexOf('/')==0||_sr.indexOf('gopher')==0)
		return sr;
	else
		return me.web_path+sr;
}

function getcl()
{
	return parseInt(nNN||nOP ? window.pageXOffset : document.body.scrollLeft);
}

function getct()
{
	return parseInt(nNN||nOP ? window.pageYOffset : document.body.scrollTop);
}

function getcw()
{
	return parseInt(nNN||nOP ? window.innerWidth : (nIEW&&document.compatMode=="CSS1Compat" ? document.documentElement.clientWidth : document.body.clientWidth));
}

function getch()
{
	return parseInt(nNN||nOP ? window.innerHeight : (nIEW&&document.compatMode=="CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight));
}

function get_sdstr(mb,issh)
{
	return	"var _mb=st_menus['"+mb.mei+"'].bodys["+mb.mbi+"];_mb.tmid=null;"+mb.speceff+(issh? "_sh(" : "_hd(")+"_mb);_mb.exec_ed=1;"
}

function getlayer(mbit)
{
	if(!mbit.layer)
	{
		if(typeof(mbit.iti)=='undefined')
			mbit.layer=getob(mbit.block,nTopTb ? 'table' : 'div');
		else
			mbit.layer=nNN4 ? getlayer(getpar(mbit)).document.layers[0].document.layers[mbit.block] : getob(mbit.block,nIEW ? 'table' : null);
	}
	return mbit.layer;
}

function get_st_lay(item)
{
	return getlayer(item).document.layers[0].document.layers;
}

function moveto(xy,body)
{
	if(xy&&(body.mbi||getme(body).pos=='absolute'))
	{
		var ly=getlayer(body);
		if(nNN4)
			ly.moveToAbsolute(xy[0],xy[1]);
		else if(nOP)
		{
			var lys=ly.style;
			lys.pixelLeft=xy[0];
			lys.pixelTop=xy[1];
		}
		else
		{
			var lys=ly.style;
			lys.left=xy[0]+'px';
			lys.top=xy[1]+'px';
		}
		body.rc=[xy[0],xy[1],body.rc[2],body.rc[3]];
	}
}

function createIMG(src,id,width,height,border)
{
	var s='<IMG SRC=';
	s+=addquo(src);
	if(id!='')
		s+=' ID='+id;
	if(width&&height)
	{
		if(width>0)
			s+=' WIDTH='+width;
		if(height>0)
			s+=' HEIGHT='+height;
	}
	s+=' BORDER='+border+'>';
	return s;
}

function show(body)
{
	var delay=body.mbi&&getpar(getpar(body)).arrange=="vertically" ? getme(body).shdelay_v : getme(body).shdelay_h;
	body.exec_ed=0;
	if(!body.rc)
		getxy(body);
	if(body.tmid)
	{
		clearTimeout(body.tmid);
		body.tmid=null;
		ck_win_els(1,body)
	}
	if(delay>0)
		body.tmid=setTimeout(get_sdstr(body,1),delay);
	body.isshow=1;
	if(delay<=0)
		eval(get_sdstr(body,1));
}

function _sh(body)
{
	var ly=getlayer(body);
	if(nNN4)
	{
		ly.visibility='show';
		if(!body.fixed)
		{
			ly.resizeBy(body.bd_sz*2,body.bd_sz*2);
			ly=ly.document.layers[0];
			ly.moveTo(body.bd_sz,body.bd_sz);
			ly.onmouseover=dombovNN4;
			ly.onmouseout=dombouNN4;
			for(var iti=body.items.length-1;iti>=0;iti--)
			{
				var item=body.items[iti];
				if(item.type!="sepline")
				{
					var st_lay=get_st_lay(item);
					st_lay[2].resizeTo(st_lay[0].parentLayer.clip.width,st_lay[0].parentLayer.clip.height);
					if(getcursor(item)=="hand")
					{
						with(st_lay[2].document)
						{
							open();
							write("<A "+getURL(item)+"\"><IMG BORDER=0 SRC='"+getme(item).blank.src+"' WIDTH="+st_lay[2].clip.width+" HEIGHT="+st_lay[2].clip.height+"></A>");
							close();
						}
					}
					st_lay[0].resizeBy(-item.bd_sz,-item.bd_sz);
					st_lay[1].resizeBy(-item.bd_sz,-item.bd_sz);
					ly=getlayer(item).document.layers[0];
					ly.onmouseover=doitovNN4;
					ly.onmouseout=doitouNN4;
					ly.onclick=doitckNN4;
				}
			}
			if(body.bd_sz)
				setTimeout("var _body=st_menus["+body.mei+"].bodys["+body.mbi+"];getlayer(_body).bgColor=_body.bd_cl;",1);
			body.fixed=1;
		}
	}
	else
		ly.style.visibility='visible';
}

function hide(body)
{
	if(body.tmid)
	{
		clearTimeout(body.tmid);
		body.tmid=null;
	}
	if(body.isshow&&!body.exec_ed)
	{
		body.exec_ed=0;
		body.isshow=0;
	}
	else
	{
		body.exec_ed=0;
		body.isshow=0;
		eval(get_sdstr(body,0));
	}
}

function _hd(body)
{
	var ly=getlayer(body);
	if(nNN4)
		ly.visibility='hide';
	else
	{
		var lyf;
		if(nIE5&&!nMac)
		{
			lyf=ly.filters['Alpha'];
			lyf.opacity=0;
		}
		ly.style.visibility='hidden';
		if(nIE5&&!nMac)	lyf.opacity=body.opacity;
	}
}

function fixmenu(menu)
{
	for(mbi=0;mbi<menu.bodys.length;mbi++)
	{
		var body=menu.bodys[mbi];
		if(nOP&&nVer<6.0)
			getlayer(body).style.pixelWidth=parseInt(getob(body.block+"TB",'table').style.pixelWidth);
		if(nIEW&&nIE5)
			getlayer(body).style.width=getlayer(body).offsetWidth;
		else if(nIEM||!nIE)
		{
			if(body.arrange!="vertically")
			{
				var iti=0;
				var fixit=getob(body.block+iti);
				var h=parseInt(nOP ? fixit.style.pixelHeight : fixit.offsetHeight);
				if(h)
				{
					for(iti=0;iti<body.items.length;iti++)
					{
						var item=body.items[iti];
						var lys=getlayer(item).style;
						var tm_h=h-2*body.spacing;
						if(nOP)
							lys.pixelHeight=tm_h;
						else if(item.type=="sepline"||nIE)
							lys.height=tm_h+'px';
						else
							lys.height=tm_h-2*item.bd_sz+'px';
	
						if(nIEM)
						{
							var fh=h-2*body.spacing;
							lltd=getob(item.block+"LLTD");
							ltd=getob(item.block+"LTD");
							rtd=getob(item.block+"RTD");
							rrtd=getob(item.block+"RRTD");
							if(lltd)
								lltd.style.height=fh+'px';
							if(ltd)
								ltd.style.height=fh+'px';
							getob(item.block+"MTD").style.height=fh+'px';
							if(rtd)
								rtd.style.height=fh+'px';
							if(rrtd)
								rrtd.style.height=fh+'px';
						}
					}
				}
			}
			else if(nOP)
			{
				for(iti=0;iti<body.items.length;iti++)
				{
					var item=body.items[iti];
					if(item.type!="sepline")
					{
						var fixit=getob(body.block+iti);
						var it=getlayer(item);
						var h=parseInt(it.style.pixelHeight);
						var w=parseInt(fixit.style.pixelWidth);
						if(h)
							it.style.pixelHeight=h;
						if(w)	
							it.style.pixelWidth=w-2*body.spacing;
					}
				}
			}
		}
	}
}

function prefix(menu)
{
	var body=menu.bodys[menu.bodys.length-1];
	var item=body.items[body.items.length-1];
	while(1)
		if(getlayer(item)) break;
	if(!nNN4)
		fixmenu(menu);
	if(menu.type!="custom")
		show(menu.bodys[0]);
	if(nIEM)
		window.onscroll=function()
		{
			if(st_scrollid)
				clearTimeout(st_scrollid);
			st_scrollid=setTimeout('scrollmenu();',500);
		}
	else if(!st_rl_id)
	{
		st_cl_w=getcw();
		st_cl_h=getch();
		st_cl_l=getcl();
		st_cl_t=getct();
		st_rl_id=setInterval("ckPage();",500);
	}
	menu.ready=1;
}

function scrollmenu()
{
	for(i=0;i<st_menus.length;i++)
	{
		var menu=st_menus[i];
		if(menu&&menu.type=="float")
		{
			hideall(menu);
			var _b=menu.bodys[0];
			ck_win_els(+1,_b);
			moveto(getxy(menu.bodys[0]),_b);
			ck_win_els(-1,_b);
		}
	}
}

function getbg(bg_cl,bg_img,bg_rep)
{
	var s=bg_cl;
	if(bg_img!='')
		s+=" url("+bg_img+") "+bg_rep;
	return s;
}

function ck_win_els(change,obj)
{
	if(!st_loaded||nNN4||nOP||obj.isstatic)	return;
	if(HideSelect)	win_ele_vis("SELECT", change, obj);
	if(HideObject)	win_ele_vis("OBJECT", change, obj);
	if(HideIFrame)	win_ele_vis("IFRAME", change, obj);
}

function win_ele_vis(tagName, change, obj)
{
	var els=nNN6 ? document.getElementsByTagName(tagName) : document.all.tags(tagName);
	var i;
	for (i=0;i<els.length;i++)
	{
		var el=els.item(i);
		var flag;
		for(flag=0,tmobj=el.offsetParent;tmobj;tmobj=tmobj.offsetParent)
			if(tmobj.id&&tmobj.id.indexOf("STM")>=0)
				flag=1;
		if(flag)
			continue;
		else if(elements_overlap(el,obj))
		{
			if (el.visLevel)
				el.visLevel+=change;
			else
				el.visLevel=change;
			if (el.visLevel==-1)
			{
				if(typeof(el.visSave)=='undefined')
					el.visSave=el.style.visibility;
				el.style.visibility="hidden";
			}
			else if (el.visLevel==0)
				el.style.visibility=el.visSave;
		}
	}
}

function elements_overlap(el,obj)
{
	var left=0;
	var top=0;
	var width=el.offsetWidth;
	var height=el.offsetHeight;
	if(width)
		el._width=width;
	else
		width=el._width;
	if(height)
		el._height=height;
	else
		height=el._height;
	
	while(el)
	{
		left+=el.offsetLeft;
		top+=el.offsetTop;
		el=el.offsetParent;
	}
	return ((left<obj.rc[2]+obj.rc[0]) && (left+width>obj.rc[0]) && (top<obj.rc[3]+obj.rc[1]) && (top+height>obj.rc[1]));
}

function getob(id,t)
{
	if(nNN6)
		return document.getElementById(id);
	else if(nNN4)
		return document.layers[id];
	else
		return t ? document.all.tags(t)[id] : document.all[id];
}

function getBodyEventString(body)
{
	var s=" onMouseOver='dombov(event,this,st_menus["+body.mei+"].bodys["+body.mbi+"]);'";
	s+=" onMouseOut='dombou(event,this,st_menus["+body.mei+"].bodys["+body.mbi+"]);'";
	return s;
}

function getItemEventString(item)
{
	if(item.type=='sepline')	return '';
	var s=" onMouseOver='doitov(event,this,st_menus["+item.mei+"].bodys["+item.mbi+"].items["+item.iti+"]);'";
	s+=" onMouseOut='doitou(event,this,st_menus["+item.mei+"].bodys["+item.mbi+"].items["+item.iti+"]);'";
	s+=" onClick='doitck(event,this,st_menus["+item.mei+"].bodys["+item.mbi+"].items["+item.iti+"]);'";
	return s;
}

function getEventCode(pre,isitem)
{
	var s=isitem ? 'st_rei' : 'st_reb';
	s+='.exec(this.parentLayer.id);mei=RegExp.$1;mbi=parseInt(RegExp.$2);';
	if(isitem)	s+='iti=parseInt(RegExp.$3);return '+pre+'(e,this,st_menus[mei].bodys[mbi].items[iti]);';
	else	s+='return '+pre+'(e,this,st_menus[mei].bodys[mbi]);';
	return new Function('e',s);
}

function addquo(n)
{
	return "\""+n+"\"";
}

function getURL(item)
{
	return " HREF=" + addquo(item.url=="" ? "javascript:;" : item.url.replace(new RegExp("\"","g"),"&quot;")) + " TARGET=" + addquo(item.url==""||item.url.toLowerCase().indexOf('javascript:')==0 ? "_self" : item.target);
}