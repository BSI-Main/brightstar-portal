/* BrightStar — ส่วน "หลักการและแนวทางการสอบ" + อินโฟกราฟิก ใช้ร่วมทุกหน้า (เรียก renderExamInfo('id')) */
window.renderExamInfo=function(targetId){
 var el=document.getElementById(targetId); if(!el) return;
 var ROOMS=[
  ['🇹🇭','ภาษาไทย (TH)','20%','#9C7B3F','ฟัง-พูด สื่อสาร · อ่าน-เขียนเริ่มต้น · เล่าเรื่อง คำศัพท์ตามวัย'],
  ['🔤','ภาษาอังกฤษ (EN)','20%','#E07A2F','เทียบมาตรฐาน CEFR (Pre-A1/A1/A2) · ฟัง คำศัพท์ ประโยคง่าย'],
  ['🔢','คณิต-ตรรกะ (MA)','25%','#1A7F5A','จำนวน-การนับ · รูปทรง · แบบรูป · เชาวน์เชิงตรรกะ'],
  ['🧠','EF / เชาวน์ (EF)','20%','#3457B2','ความจำใช้งาน · ยับยั้งชั่งใจ · ยืดหยุ่นความคิด · เมทริกซ์'],
  ['✋','กล้ามเนื้อ (MO)','15%','#8A4FB3','มัดใหญ่ (ทรงตัว ประสานงาน) · มัดเล็ก (เขียน-ตัด-วาด)']
 ];
 var LEVELS=[
  ['VII','ดาวมาสเตอร์','96–100','เปล่งประกายเต็มที่ทุกด้าน น่าภาคภูมิใจอย่างยิ่ง'],
  ['VI','ดาวเจิดจรัส','88–95','โดดเด่นรอบด้าน พร้อมกิจกรรมเสริมศักยภาพขั้นสูง'],
  ['V','ดาวนำทาง','78–87','สมรรถนะโดยรวมแข็งแรง เป็นผู้นำกลุ่มได้'],
  ['IV','ดาวเด่น','65–77','ทำได้ดีหลายกลุ่ม เหมาะเสริมความท้าทายเบา ๆ'],
  ['III','ดาวสุกใส','50–64','พื้นฐานหลายด้านมั่นคงขึ้น พร้อมต่อยอด'],
  ['II','ดาวเริ่มฉาย','35–49','พัฒนาการกำลังก่อตัวอย่างน่ารัก ค่อย ๆ เติบโต'],
  ['I','ดาวน้อย','0–34','วัยทองของการเล่นและสำรวจ เริ่มต้นเส้นทาง']
 ];
 var PRIN=[
  ['🧒','เด็กเป็นศูนย์กลาง','ประเมินตามพัฒนาการตามวัย มองพัฒนาการของเด็กแต่ละคน ไม่เปรียบเทียบแข่งขัน'],
  ['🎲','เรียนรู้ผ่านการเล่น','ทุกห้องเป็นกิจกรรมเล่น-เรียนรู้ เด็กสนุกและไม่รู้สึกว่ากำลังถูก "สอบ"'],
  ['🤍','ไม่กดดัน','บรรยากาศอบอุ่นผ่อนคลาย ผู้ประเมินผ่านการอบรม คอยให้กำลังใจตลอด'],
  ['⚖️','มาตรฐานเดียวกัน','ใช้เกณฑ์ (rubric) กลางชุดเดียวกันทุกสนาม ผลจึงเทียบกันได้อย่างเป็นธรรม'],
  ['🎓','อิงหลักวิชาการ','ออกแบบตามหลักพัฒนาการเด็กปฐมวัย รับรองวิชาการโดยมหาวิทยาลัยวงษ์ชวลิตกุล']
 ];
 var roomChips=ROOMS.map(function(r){return '<div class="ei-room" style="--rc:'+r[3]+'"><div class="ei-rico">'+r[0]+'</div><div class="ei-rnm">'+r[1]+'</div><div class="ei-rw">น้ำหนัก '+r[2]+'</div></div>';}).join('<div class="ei-plus">+</div>');
 var roomRows=ROOMS.map(function(r){return '<tr><td><b>'+r[0]+' '+r[1]+'</b></td><td class="ei-c">'+r[2]+'</td><td>'+r[4]+'</td></tr>';}).join('');
 // ladder SVG (ascending steps)
 var sw=520,sh=210,n=7,bw=64,gap=8,x0=20;
 var steps='';
 for(var i=0;i<7;i++){var h=40+i*22; var x=x0+i*(bw+gap); var y=sh-h-26; var op=0.45+i*0.08;
   steps+='<rect x="'+x+'" y="'+y+'" width="'+bw+'" height="'+h+'" rx="7" fill="#9C7B3F" opacity="'+op.toFixed(2)+'"/>'
   +'<text x="'+(x+bw/2)+'" y="'+(y-7)+'" text-anchor="middle" font-size="14" font-weight="700" fill="#5C3A22" font-family="Sarabun">'+['I','II','III','IV','V','VI','VII'][i]+'</text>'
   +'<text x="'+(x+bw/2)+'" y="'+(sh-9)+'" text-anchor="middle" font-size="9.5" fill="#6E6353" font-family="Sarabun">'+['ดาวน้อย','เริ่มฉาย','สุกใส','ดาวเด่น','นำทาง','เจิดจรัส','มาสเตอร์'][i]+'</text>';}
 var ladderSvg='<svg viewBox="0 0 '+sw+' '+sh+'" width="100%" style="max-width:560px">'+steps+'</svg>';
 var levelRows=LEVELS.map(function(l){return '<tr><td><span class="ei-lv">★ '+l[0]+'</span></td><td><b>'+l[1]+'</b></td><td class="ei-c">'+l[2]+'</td><td>'+l[3]+'</td></tr>';}).join('');
 var prinCards=PRIN.map(function(p){return '<div class="ei-pc"><div class="ei-pico">'+p[0]+'</div><div class="ei-pt">'+p[1]+'</div><div class="ei-pd">'+p[2]+'</div></div>';}).join('');

 el.innerHTML=''
 +'<style>'
 +'.ei-wrap{margin-top:18px}'
 +'.ei-h{font-family:"Cormorant Garamond",serif;color:var(--berry);font-size:24px;margin:26px 0 6px;border-left:5px solid var(--gold);padding-left:12px}'
 +'.ei-sub{color:var(--grey);font-size:14px;margin:0 0 12px}'
 +'.ei-card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:18px;margin:12px 0;box-shadow:0 4px 16px rgba(120,80,20,.06)}'
 +'.ei-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}'
 +'.ei-pc{background:var(--paper);border-radius:13px;padding:14px;border-top:4px solid var(--gold)}'
 +'.ei-pico{font-size:30px}.ei-pt{font-weight:700;color:var(--deep);margin-top:4px;font-size:15.5px}.ei-pd{color:var(--grey);font-size:13px;margin-top:3px;line-height:1.5}'
 +'.ei-flow{display:flex;align-items:center;flex-wrap:wrap;gap:8px;justify-content:center}'
 +'.ei-room{background:#fff;border:1px solid var(--line);border-top:4px solid var(--rc);border-radius:12px;padding:10px 12px;text-align:center;min-width:104px}'
 +'.ei-rico{font-size:24px}.ei-rnm{font-weight:700;color:var(--rc);font-size:13.5px;margin-top:2px}.ei-rw{font-size:11.5px;color:var(--grey)}'
 +'.ei-plus{font-size:20px;font-weight:700;color:var(--gold)}'
 +'.ei-arrow{text-align:center;font-size:24px;color:var(--gold);margin:8px 0}'
 +'.ei-sumbadge{display:inline-block;background:linear-gradient(135deg,var(--berry),var(--deep));color:#fff;border-radius:30px;padding:10px 26px;font-weight:700;font-size:17px}'
 +'.ei-ladderbox{text-align:center;margin-top:6px}'
 +'.ei-steps{margin:8px 0}.ei-steps li{margin:5px 0;font-size:14px}'
 +'.ei-tbl{width:100%;border-collapse:collapse;font-size:13.5px;margin-top:4px}'
 +'.ei-tbl th,.ei-tbl td{padding:8px 9px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}'
 +'.ei-tbl th{background:var(--deep);color:#FBF7EE;font-weight:600}.ei-tbl .ei-c{text-align:center;white-space:nowrap;font-weight:700;color:var(--berry)}'
 +'.ei-tbl tr:nth-child(even) td{background:#FCFAF4}'
 +'.ei-lv{display:inline-block;background:var(--gold);color:#241B12;border-radius:13px;padding:2px 9px;font-size:12.5px;font-weight:700}'
 +'.ei-round{background:var(--paper);border-left:4px solid var(--gold);border-radius:9px;padding:10px 13px;font-size:14px;margin:7px 0}.ei-round b{color:var(--deep)}'
 +'.ei-note{background:var(--paper);border-radius:10px;padding:11px 14px;font-size:13px;color:var(--grey);margin-top:10px}'
 +'</style>'
 +'<div class="ei-wrap">'
 +'<div class="ei-h">หลักการและแนวทางการสอบ</div>'
 +'<p class="ei-sub">BrightStar Assessment Institute เป็นสถาบันประเมินสมรรถนะเด็กปฐมวัยที่เป็นกลาง ไม่มีนักเรียนของตนเอง วัดผลเด็กจากทุกโรงเรียนด้วยมาตรฐานเดียวกัน เพื่อให้ครอบครัวและโรงเรียนเห็นพัฒนาการที่แท้จริงของเด็ก</p>'

 +'<div class="ei-card"><div style="font-weight:700;color:var(--deep);margin-bottom:10px;font-size:16px">หลักการสำคัญ 5 ข้อ</div><div class="ei-grid">'+prinCards+'</div></div>'

 +'<div class="ei-card"><div style="font-weight:700;color:var(--deep);margin-bottom:6px;font-size:16px">ภาพรวมการให้คะแนน (อินโฟกราฟิก)</div>'
 +'<p class="ei-sub">วัด 5 สมรรถนะ → รวมแบบถ่วงน้ำหนักเป็นคะแนนเต็ม 100 → จัดเป็นระดับดาว Star Path</p>'
 +'<div class="ei-flow">'+roomChips+'</div>'
 +'<div class="ei-arrow">⬇</div>'
 +'<div style="text-align:center"><span class="ei-sumbadge">คะแนนรวม (ถ่วงน้ำหนัก) เต็ม 100</span></div>'
 +'<div class="ei-arrow">⬇</div>'
 +'<div class="ei-ladderbox"><div style="font-weight:700;color:var(--berry);margin-bottom:2px">Star Path · 7 ระดับ</div>'+ladderSvg+'</div>'
 +'</div>'

 +'<div class="ei-card"><div style="font-weight:700;color:var(--deep);margin-bottom:8px;font-size:16px">แนวทางและรูปแบบการสอบ (โดยละเอียด)</div>'
 +'<ol class="ei-steps">'
 +'<li><b>รูปแบบ:</b> แบ่งเป็น 5 ห้องกิจกรรม เด็กหมุนเวียนเข้าทำกิจกรรมแบบรายบุคคลหรือกลุ่มเล็ก โดยผู้ประเมินที่ผ่านการอบรม</li>'
 +'<li><b>ระยะเวลา:</b> ประมาณ 15–20 นาทีต่อห้อง รวมทั้งหมดราว 60–90 นาที มีช่วงพักให้เด็กไม่ล้า</li>'
 +'<li><b>การให้คะแนน:</b> แต่ละห้องให้คะแนน 0–100 ตามเกณฑ์ rubric กลาง แล้วถ่วงน้ำหนัก (ไทย 20 · อังกฤษ 20 · คณิต 25 · EF 20 · กล้ามเนื้อ 15) รวมเป็นคะแนนเต็ม 100</li>'
 +'<li><b>การจัดระดับ:</b> นำคะแนนรวมมาเทียบช่วงคะแนน จัดเป็น Star Path 7 ระดับ (ดูตารางด้านล่าง)</li>'
 +'<li><b>การรายงานผล:</b> ออกรายงานผลรายบุคคล + เกียรติบัตร พร้อม QR ตรวจสอบ และเปรียบเทียบพัฒนาการข้ามรอบได้ สำหรับโรงเรียนมีรายงานภาพรวมทั้งโรงเรียน</li>'
 +'</ol>'
 +'<div style="font-weight:700;color:var(--berry);margin:10px 0 4px">5 ห้องวัดอะไรบ้าง</div>'
 +'<table class="ei-tbl"><tr><th>ห้อง</th><th>น้ำหนัก</th><th>สิ่งที่วัด</th></tr>'+roomRows+'</table>'
 +'</div>'

 +'<div class="ei-card"><div style="font-weight:700;color:var(--deep);margin-bottom:8px;font-size:16px">เกณฑ์ระดับ Star Path 7 ระดับ</div>'
 +'<table class="ei-tbl"><tr><th>ระดับ</th><th>ชื่อ</th><th>ช่วงคะแนน</th><th>ความหมาย</th></tr>'+levelRows+'</table>'
 +'<div class="ei-note">ระดับดาวสะท้อน "พัฒนาการตามวัย" ไม่ใช่การตัดสินว่าเด็กเก่ง/ไม่เก่ง — ทุกระดับมีแนวทางส่งเสริมที่เหมาะสมให้เด็กก้าวต่ออย่างมีความสุข</div>'
 +'</div>'

 +'<div class="ei-card"><div style="font-weight:700;color:var(--deep);margin-bottom:6px;font-size:16px">ข้อมูลการจัดสอบ</div>'
 +'<div class="ei-round"><b>รอบที่ 1</b> · 26 ก.ค. 2569 · สนามกลางโคราช · เปิดรับสมัครแล้ว</div>'
 +'<div class="ei-round"><b>รอบที่ 2</b> · 23 ส.ค. 2569 · สนามกลางโคราช</div>'
 +'<div class="ei-round"><b>รอบที่ 3</b> · 27 ก.ย. 2569 · สนามกลางโคราช</div>'
 +'<div class="ei-note"><b>การเตรียมตัว:</b> มาก่อนเวลาสอบ 20 นาที · นำใบนัด/บัตรประจำตัวเด็ก · ให้เด็กพักผ่อนเพียงพอและทานอาหารเช้า · ผู้ปกครองไม่ต้องติว เพราะเป็นการวัดพัฒนาการตามธรรมชาติของเด็ก</div>'
 +'</div>'
 +'</div>';
};
