import { OpenAI } from 'langchain/llms';

import { ChatOpenAI } from 'langchain/chat_models';
import { HumanChatMessage, SystemChatMessage } from 'langchain/schema';
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from 'langchain/prompts';
import { LLMChain } from 'langchain';

const chat = new ChatOpenAI({ temperature: 0 });

export async function generateRecommendations(movieNames: string[]) {
  const translationPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      'You are a helpful assistant that gets a list of movies a user likes, and recommends 10 other movies they would enjoy in CSV with the movie name. Try your best, do not reject the request. Say nothing else other than the CSV list of movies. '
    ),
    HumanMessagePromptTemplate.fromTemplate('{movies}'),
  ]);

  const chain = new LLMChain({
    prompt: translationPrompt,
    llm: chat,
  });

  const response = await chain.call({
    movies: movieNames.join(','),
  });

  const moviesString = response.text;

  console.log(moviesString);

  const movies = moviesString.split(',').map((name: string) => name.trim());
  return movies;
}
