const kanboo = {
  compiler: `public Map<String, String[]> createCmd(Map<String, String> pathList) {
    Map<String, String[]> resultList = new HashMap<>();
    String[] compileCmd = {"/bin/sh", "-c", " javac -cp . -d " + pathList.get("classPath") + " $(find " + pathList.get("srcPath") + " -name \"*.java\")"};
    String[] createManifestCmd = {"/bin/sh", "-c", " jar -cfvm " + pathList.get("jarNameAndPath") + " " + pathList.get("manifestNameAndPath") + " " + pathList.get("classPath")};
    String[] setJarCmd = {"/bin/sh", "-c", " jar -xvf " + pathList.get("jarNameAndPath") + " " + pathList.get("topPath")};
    String[] setManifestCmd = {"/bin/sh", "-c", " jar -cfvm " + pathList.get("jarNameAndPath") + " " + pathList.get("manifestNameAndPath") + " " + pathList.get("classPath")};
    String[] runJarCmd = {"/bin/sh", "-c",  " java -jar " + pathList.get("jarNameAndPath")};

    resultList.put("compileCmd", compileCmd);
    resultList.put("createManifestCmd", createManifestCmd);
    resultList.put("setJarCmd", setJarCmd);
    resultList.put("setManifestCmd", setManifestCmd);
    resultList.put("runJarCmd", runJarCmd);

    return resultList;
}

public Map<String, String> terminalCompile(String[] cmd) {
    Map<String, String> result = new HashMap<>();
    StringBuffer out = new StringBuffer();
    try {
        Process process = Runtime.getRuntime().exec(cmd);
        List<String> error = IOUtils.readLines(process.getErrorStream());
        if(error.size() > 0) {
            error.forEach(item -> {
                out.append(item + "\n");
            });
            result.put("isSuccess", "false");
            result.put("detail", out.toString());
            return result;
        }
        List<String> success = IOUtils.readLines(process.getInputStream());
        success.forEach(item -> {
            out.append(item + "\n");
        });
        result.put("isSuccess", "true");
        result.put("detail", out.toString());
    } catch(Exception e) {
        out.append(e.getMessage());
    }
    return result;
}`
}