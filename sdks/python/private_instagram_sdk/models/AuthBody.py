# coding: utf-8

"""
    Instagram API

    The Instagram Private API in OpenAPI specs.v3.0  # noqa: E501

    OpenAPI spec version: 0.0.1
    GitHub repo: https://github.com/instagrambot/instagram-api-toolkit
"""

import pprint
import re  # noqa: F401

import six


class AuthBody(object):
    """NOTE: This class is auto generated by OpenAPI Generator.
    Ref: https://openapi-generator.tech

    Do not edit the class manually.
    """
    """
    Attributes:
      openapi_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    openapi_types = {
        'ig_sig_key_version': '',
        'signed_body': ''
    }

    attribute_map = {
        'ig_sig_key_version': 'ig_sig_key_version',
        'signed_body': 'signed_body'
    }

    def __init__(self, ig_sig_key_version=None, signed_body=None):  # noqa: E501
        """AuthBody - a model defined in OpenAPI"""  # noqa: E501
        self._ig_sig_key_version = None
        self._signed_body = None
        self.discriminator = None
        if ig_sig_key_version is not None:
            self.ig_sig_key_version = ig_sig_key_version
        if signed_body is not None:
            self.signed_body = signed_body

    @property
    def ig_sig_key_version(self):
        """Gets the ig_sig_key_version of this AuthBody.  # noqa: E501


        :return: The ig_sig_key_version of this AuthBody.  # noqa: E501
        :rtype: 
        """
        return self._ig_sig_key_version

    @ig_sig_key_version.setter
    def ig_sig_key_version(self, ig_sig_key_version):
        """Sets the ig_sig_key_version of this AuthBody.


        :param ig_sig_key_version: The ig_sig_key_version of this AuthBody.  # noqa: E501
        :type: 
        """

        self._ig_sig_key_version = ig_sig_key_version

    @property
    def signed_body(self):
        """Gets the signed_body of this AuthBody.  # noqa: E501


        :return: The signed_body of this AuthBody.  # noqa: E501
        :rtype: 
        """
        return self._signed_body

    @signed_body.setter
    def signed_body(self, signed_body):
        """Sets the signed_body of this AuthBody.


        :param signed_body: The signed_body of this AuthBody.  # noqa: E501
        :type: 
        """

        self._signed_body = signed_body

    def to_dict(self):
        """Returns the model properties as a dict"""
        result = {}

        for attr, _ in six.iteritems(self.openapi_types):
            value = getattr(self, attr)
            if isinstance(value, list):
                result[attr] = list(map(
                    lambda x: x.to_dict() if hasattr(x, "to_dict") else x,
                    value
                ))
            elif hasattr(value, "to_dict"):
                result[attr] = value.to_dict()
            elif isinstance(value, dict):
                result[attr] = dict(map(
                    lambda item: (item[0], item[1].to_dict())
                    if hasattr(item[1], "to_dict") else item,
                    value.items()
                ))
            else:
                result[attr] = value

        return result

    def to_str(self):
        """Returns the string representation of the model"""
        return pprint.pformat(self.to_dict())

    def __repr__(self):
        """For `print` and `pprint`"""
        return self.to_str()

    def __eq__(self, other):
        """Returns true if both objects are equal"""
        if not isinstance(other, AuthBody):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other
