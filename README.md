# jQuery.values

jQuery plugin to retrieve form input values.

## Usage

Get all values of input elements inside the login form. The result is an hash map. The input name is the key in the hash map.

Disabled input elements will be ignored.

```
jQuery('form#login').values()
```

If the input element supports multiple values either by an multiple attribute or by a set of checkboxes then the resulting value will be an array.

An exception of this behavior is the file input element. This will return a FileList object if the multiple attribute is present.

### Examples

#### Get all input element values of the document.

```
jQuery('*').values();
```

#### Get the values of a set of input elements.

```
jQuery(':input').values();
```

#### Get the values of input elements inside some unspecific element.

```
jQuery('.class-name').values();
```



