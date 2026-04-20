export async function POST(req: Request) {
  const { language } = await req.json();

  let responseText = "I found a great option for you. Suryoday Small Finance Bank offers 8.50% p.a. for a 12-month tenure. Your 1 Lakh will become ₹1,08,500. Should we proceed with the booking? [TRIGGER_BOOKING]";
  
  if (language === "हिंदी") {
    responseText = "मुझे आपके लिए एक बेहतरीन विकल्प मिला है। सूर्योदय स्मॉल फाइनेंस बैंक 12 महीने की अवधि के लिए 8.50% ब्याज दे रहा है। आपका 1 लाख रुपये ₹1,08,500 हो जाएगा। क्या हम बुकिंग करें? [TRIGGER_BOOKING]";
  } else if (language === "मराठी") {
    responseText = "मला तुमच्यासाठी एक उत्तम पर्याय सापडला आहे. सूर्योदय स्मॉल फायनान्स बँक 12 महिन्यांसाठी 8.50% व्याज देत आहे. तुमचे 1 लाख रुपये ₹1,08,500 होतील. आपण बुकिंग करूया का? [TRIGGER_BOOKING]";
  }

  const stream = new ReadableStream({
    async start(controller) {
      const words = responseText.split(' ');
      for (const word of words) {
        // Vercel AI SDK Data Stream protocol format: 0:"text"
        controller.enqueue(new TextEncoder().encode(`0:${JSON.stringify(word + " ")}\n`));
        await new Promise((r) => setTimeout(r, 80)); // Simulate typing speed
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'x-vercel-ai-data-stream': 'v1'
    },
  });
}
