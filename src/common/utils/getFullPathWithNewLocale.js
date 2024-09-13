const getFullPathWithNewLocale = (oldFullPath, newLocale) => {
	if (!newLocale) return oldFullPath;

	const pathElements = oldFullPath.split('/');

	const newPath = `/${newLocale}` + pathElements.slice(2).join('/');

	return newPath;
};

export default getFullPathWithNewLocale;
