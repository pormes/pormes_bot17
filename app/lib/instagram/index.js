/* eslint-disable no-param-reassign */

import { get } from 'lodash';
import Http from './http';

import {
  COMMENTS_GRAPH,
  DISCOVER_MEDIAS_GRAPH,
  FOLLOWERS_GRAPH,
  FOLLOWING_GRAPH,
  HASHTAG_GRAPH,
  LIKERS_SHORTCODE_GRAPH,
  PLACE_MEDIA_GRAPH,
  USER_MEDIA_GRAPH,
  USER_STORIES_GRAPH,
} from './constants';

function ApiError(message, response) {
  const error = new Error();

  error.name = 'ApiError';
  error.message = message;
  error.response = response;

  return error;
}

export default class Instagram {
  constructor() {
    this.http = new Http();
  }

  graphql(queryHash, variables = {}) {
    return this.http.get('/graphql/query/', {
      params: {
        query_hash: queryHash,
        variables: JSON.stringify(variables),
      },
    });
  }

  async auth(username, password) {
    this.http.cookies.clear();

    const resp = await this.http.post('/accounts/login/ajax/', {
      jar: true,
      form: { username, password },
    });

    if (get(resp, 'data.authenticated')) return resp.data;

    throw new ApiError('Incorrect login or password', resp);
  }

  async profile() {
    const resp = await this.http.get('/accounts/edit/?__a=1');
    return resp.data.form_data;
  }

  async account(name) {
    const resp = await this.http.get(`/${name}/?__a=1`);
    return get(resp.data, 'graphql.user');
  }

  async followers(userId, limit = 20) {
    const resp = await this.graphql(FOLLOWERS_GRAPH, {
      id: String(userId),
      first: limit,
    });

    return get(resp.data, 'data.user.edge_followed_by');
  }

  async following(userId, limit = 20) {
    const resp = await this.graphql(FOLLOWING_GRAPH, {
      id: String(userId),
      first: limit,
    });

    return get(resp.data, 'data.user.edge_follow');
  }

  async follow(userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/follow/`);
    return resp.data;
  }

  async unfollow(userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/unfollow/`);
    return resp.data;
  }

  async approveFriendship(userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/approve/`);
    return resp.data;
  }

  async ignoreFriendship(userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/ignore/`);
    return resp.data;
  }

  async block(userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/block/`);
    return resp.data;
  }

  async unblock(userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/unblock/`);
    return resp.data;
  }

  async me() {
    const resp = await this.http.get('/accounts/edit/?__a=1');
    return get(resp, 'data.form_data');
  }

  async hashtag(hashtag, limit = 20) {
    const resp = await this.graphql(HASHTAG_GRAPH, {
      tag_name: String(hashtag),
      first: limit,
    });

    return get(resp.data, 'data.hashtag.edge_hashtag_to_media');
  }

  async shortcodeMedia(shortcode) {
    const resp = await this.http.get(`/p/${shortcode}/?__a=1`);
    return get(resp.data, 'graphql.shortcode_media');
  }

  async like(mediaId) {
    const resp = await this.http.post(`/web/likes/${mediaId}/like/`);
    return resp.data;
  }

  async unlike(mediaId) {
    const resp = await this.http.post(`/web/likes/${mediaId}/unlike/`);
    return resp.data;
  }

  async save(mediaId) {
    const resp = await this.http.post(`/web/save/${mediaId}/save/`);
    return resp.data;
  }

  async unsave(mediaId) {
    const resp = await this.http.post(`/web/save/${mediaId}/unsave/`);
    return resp.data;
  }

  async userMedias(userId, limit = 20) {
    const resp = await this.graphql(USER_MEDIA_GRAPH, {
      id: String(userId),
      first: limit,
    });

    return get(resp.data, 'data.user.edge_owner_to_timeline_media');
  }

  async userStories(userId) {
    const resp = await this.graphql(USER_STORIES_GRAPH, {
      id: String(userId),
      include_chaining: true,
      include_reel: true,
      include_suggested_users: false,
      include_logged_out_extras: false,
    });

    return get(resp.data, 'data.user');
  }

  async placeMedias(placeId, limit = 20) {
    const resp = await this.graphql(PLACE_MEDIA_GRAPH, {
      id: String(placeId),
      first: limit,
    });

    return get(resp.data, 'data.location.edge_location_to_media');
  }

  async searchAny(query) {
    const resp = await this.http.get(`/web/search/topsearch/?context=blended&query=${query}`);
    return resp.data;
  }

  async searchUsers(username) {
    const resp = await this.http.get(`/web/search/topsearch/?context=user&query=${username}`);
    return resp.data;
  }

  async searchHashtags(hashtag) {
    const resp = await this.http.get(`/web/search/topsearch/?context=hashtag&query=${hashtag}`);
    return resp.data;
  }

  async searchPlaces(place) {
    const resp = await this.http.get(`/web/search/topsearch/?context=place&query=${place}`);
    return resp.data;
  }

  async addComment(mediaId, text) {
    const resp = await this.http.post(`/web/comments/${mediaId}/add/`, {
      form: { comment_text: String(text) },
    });
    return resp.data;
  }

  async deleteComment(mediaId, commentId) {
    const resp = await this.http.post(`/web/comments/${mediaId}/delete/${commentId}/`);
    return resp.data;
  }

  async activity() {
    const resp = await this.http.get('/accounts/activity/?__a=1');
    return get(resp.data, 'graphql.user');
  }

  async discoverMedias(limit = 20, page = 1) {
    const resp = await this.graphql(DISCOVER_MEDIAS_GRAPH, {
      first: limit,
      after: page,
    });

    return get(resp.data, 'data.user.edge_web_discover_media');
  }

  async shortcodeLikers(shortcode, limit = 20) {
    const resp = await this.graphql(LIKERS_SHORTCODE_GRAPH, {
      shortcode,
      first: limit,
    });

    return get(resp.data, 'data.shortcode_media');
  }

  async shortcodeComments(shortcode, limit = 20) {
    const resp = await this.graphql(COMMENTS_GRAPH, {
      shortcode,
      first: limit,
    });

    return get(resp.data, 'data.shortcode_media.edge_media_to_comment');
  }
}
