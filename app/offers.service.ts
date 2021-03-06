import { Injectable } from '@angular/core';

@Injectable()
export class OffersService {

  constructor() { }

  getCards(){
    return [
      {
        "title": "הסעה לדיאליזה",
        "content": `לחולה דיאליזה מראשון לציון נדרשת הסעה בכל יום שלישי לביה"ח "קפלן" ברחובות`,
        "img":`give4.jpg`
      },
      {
        "title": "תרומת מצרכים",
        "content":`לארגון "לתת" דרוש תרומת מצרכים, לחצו על "פרטים נוספים" בשביל לצפות ברשימת מרכזי האיסוף`,
        "img":`give3.jpg`
      },
      {
        "title": "תרומת בגדי תינוק",
        "content":`נדרשת תרומת בגדי תינוק בגילאי 0-2`,
        "img":`give2.jpg`
      },
      {
        "title": "שיחה עם קשיש",
        "content":`אדם מבוגר מעוניין באיש שיחה שייפגש איתו פעם בשבוע למשך שעה`,
        "img":`give1.jpg`
      },
      {
        "title": "צביעת בית של ניצול שואה",
        "content":`נדרשת עזרה בצביעת ביתו של ניצול שואה המתגורר לבדו`,
        "img":`give8.jpg`
      },
      {
        "title": "ריהוט לחייל בודד",
        "content":`לחייל בודד שנכנס לדירה ריקה דרושים רהיטים כגון : סלון, שולחן אוכל ,שולחן סלון ומיטה`,
        "img":`give7.jpg`
      },
      {
        "title": "חלוקת מתנות לילדים",
        "content":`דרושים מתנדבים לחלוקת מתנות לילדים המאושפזים בביה"ח דנה`,
        "img":`give6.jpg`
      },
      {
        "title": "תרומת צעצועים",
        "content":`עשיתם סדר בבית? זה הזמן לתרום צעצועים שנמצאים במצב טוב`,
        "img":`give5.jpg`
      }
    ];
  }
}
