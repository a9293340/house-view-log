import xss from "xss";

const whiteList = () => {
	const whiteListMap = { ...xss.whiteList };
	Object.keys(whiteListMap).forEach((keyName) => {
		whiteListMap[keyName] = ["style"];
	});
	return whiteListMap;
};

export const xssParse = (str) => {
	return xss(str, {
		whiteList: whiteList(),
		stripIgnoreTag: true,
		stripIgnoreTagBody: ["script"],
	});
};
