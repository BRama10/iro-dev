import Groq from 'groq-sdk';

export const groq = new Groq({
    apiKey: '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', // This is the default and can be omitted
    dangerouslyAllowBrowser: true
});

export async function suggestions(prompt: string, type:string) {
    let system = '';
    if (type == 'new_idea') {
        system = `You are an AI assistant that given a phrase, supplies around EIGHT 2-3 sentence video ideas based on that phrase. Make sure they are detailed enough to be used for text-to-video generation. You respond in JSON.  The JSON schema should include
        {
          "ideas": [
            #list of ideas here  (should be strings)
          ]
        }`
    } else {
        system = `You are an AI assistant that given a video idea, supplies around EIGHT 2-3 sentence video ideas based on that phrase, that are like "forks of it". You respond in JSON.  The JSON schema should include
        {
          "ideas": [
            #list of ideas here (should be strings)
          ]
        }`
    }
    const chatCompletion = await groq.chat.completions.create({
        messages: [{
            role: 'system',
            content: system,
        }, {
            role: 'user', content: `User Prompt: ${prompt}`
        }],
        model: 'mixtral-8x7b-32768',
        response_format: {"type": "json_object"}
    });

    return JSON.parse(chatCompletion.choices[0].message.content!).ideas
}
